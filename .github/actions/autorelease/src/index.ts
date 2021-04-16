/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

import * as core from "@actions/core";
import * as github from "@actions/github";

import { env } from "process";
import * as fs from "fs";

import * as utils from "./utils";

type OctoKit = ReturnType<typeof github.getOctokit>;

interface PackageInformation {
	name: string;
	version: string;
}

interface GithubRelease {
	id: number;
	upload_url: string;
	html_url: string;
	tag_name: string;
	body?: string | null;
	target_commitish: string;
}

export interface GithubReleaseAsset {
	name: string;
	mime: string;
	size: number;
	data: Buffer;
}

interface GithubConfig {
	token: string;
	sha: string;
	tag: string;
	reference: string;
	owner: string;
	repo: string;
	prerelease: boolean;
}

function getConfig(): GithubConfig | undefined {
	const ensure = (v: string): boolean => {
		if (env[v] == null) {
			core.setFailed(`Required environment variable ${v} was unset.`);
			return false;
		} else {
			return true;
		}
	};

	if (ensure("GITHUB_TOKEN") && ensure("GITHUB_SHA") && ensure("GITHUB_REF") && ensure("GITHUB_REPOSITORY")) {
		const [owner, repo] = (<string>env.GITHUB_REPOSITORY).split("/");
		const tag = (<string>env.GITHUB_REF).replace("refs/tags/", "");

		return {
			token: env.GITHUB_TOKEN as string,
			sha: env.GITHUB_SHA as string,
			reference: env.GITHUB_REF as string,
			owner,
			repo,
			tag,
			prerelease: env.INPUT_PRERELEASE == "true"
		};
	} else {
		return;
	}
}

async function existingReleaseDeletion(octo: OctoKit, config: GithubConfig): Promise<void> {
	const tag = config.reference.replace("refs/tags/", "");

	try {
		const [owner, repo] = [config.owner, config.repo];
		await utils.apiTimeout();
		const release = await octo.repos.getReleaseByTag({ owner, repo, tag });
		await utils.apiTimeout();
		core.warning(`An existing release for ${config.tag} was deleted.`);
		await octo.repos.deleteRelease({ owner, repo, release_id: release.data.id });
		await utils.apiTimeout();
		return existingReleaseDeletion(octo, config);
	} catch {
		return;
	}
}

async function existingDraftDeletion(octo: OctoKit, config: GithubConfig): Promise<void> {
	const [owner, repo] = [config.owner, config.repo];

	await utils.apiTimeout();
	const iterator = octo.paginate.iterator<GithubRelease>(octo.repos.listReleases.endpoint.merge({
		per_page: 100,
		owner, repo
	}));

	let release: GithubRelease | undefined;
	for await (const response of iterator) {
		let result = response.data.find(release => release.tag_name === config.tag);
		if (result) {
			release = result;
			break;
		}
	}

	if (release != null) {
		await utils.apiTimeout();
		core.warning(`An existing draft for ${config.tag} was deleted.`);
		await octo.repos.deleteRelease({ owner, repo, release_id: release.id });
		return existingDraftDeletion(octo, config);
	}
}

async function parseChangeLog(config: GithubConfig, info: PackageInformation): Promise<string | undefined> {
	const logPath = "./CHANGELOG.md";
	const [status, data] = await utils.readFile(logPath);

	switch(status) {
		case utils.FileReadStatus.SUCCESS:
			break;
		case utils.FileReadStatus.FILE_MISSING:
			core.setFailed("Missing CHANGELOG.md at repository root.");
			return;
		case utils.FileReadStatus.NO_READ_ACCESS:
			core.setFailed("No read access on CHANGELOG.md at repository root.");
			return;
		case utils.FileReadStatus.FAILED_READ:
			core.setFailed("Failed to read CHANGELOG.md file from disk.");
			return;
		default:
			return utils.assertUnreachable(status);
	}

	if (data == null) {
		core.setFailed("Failed due to not being provided with data on a successful CHANGELOG.md read.");
		return;
	}

	const lines = utils.splitLines(data.toString());
	const changeHeader = /^#{1,6}\s+Version\s+([0-9]{1,4}.[0-9]{1,4}.[0-9]{1,4}) \(.*\)\s?$/;

	let startIndex: number | undefined;
	let endIndex: number | undefined;
	for (let i = 0; i < lines.length; ++i) {
		const line = lines[i];
		const result = line.match(changeHeader);
		if (result == null || result[1] == null) continue;
		let version = result[1];

		if (startIndex != null) {
			endIndex = i;
			break;
		} else if (config.tag === `v${ version }`) {
			startIndex = i;
		}
	}

	if (startIndex == null) {
		core.setFailed(`The CHANGELOG.md does not contain an entry for tag ${ config.tag }.`); // We get to here..
		return;
	}

	if (endIndex == null) {
		endIndex = lines.length - 1;
	}

	if (startIndex === endIndex) {
		core.setFailed(`The CHANGELOG.md entry for ${ info.version } is empty.`);
		return;
	}

	let s: string = "";
	for (let i = startIndex + 1; i < endIndex; ++i) {
		s += `${ lines[i] }\n`;
	}
	return s;
}

async function publishRelease(octo: OctoKit, config: GithubConfig, info: PackageInformation):
	Promise<GithubRelease | undefined> {

	await utils.apiTimeout();

	const changes = await parseChangeLog(config, info);
	if (changes == null) {
		return;
	}

	const response = await octo.repos.createRelease({
		owner: config.owner,
		repo: config.repo,
		tag_name: config.tag,
		name: config.tag,
		body: changes,
		draft: false,
		prerelease: false
	});

	return response.data;
}

async function getPackageInfo(): Promise<{ name: string, version: string } | undefined> {
	const packageFilePath = "./package.json";
	const [status, data] = await utils.readFile(packageFilePath);

	switch (status) {
		case utils.FileReadStatus.SUCCESS:
			break;
		case utils.FileReadStatus.FILE_MISSING:
			core.setFailed("Missing package.json file at repository root.");
			return;
		case utils.FileReadStatus.NO_READ_ACCESS:
			core.setFailed("No read access on package.json file at repository root.");
			return;
		case utils.FileReadStatus.FAILED_READ:
			core.setFailed("Failed to read package.json file from disk.");
			return;
		default:
			return utils.assertUnreachable(status);
	}

	if (data == null) {
		core.setFailed("Failed due to not being provided with data on a successful package.json read.")
		return;
	}

	let info: Partial<PackageInformation>;
	try {
		info = JSON.parse(data.toString());
	} catch {
		core.setFailed("Failed to parse package.json file.");
		return;
	}

	if (info.name == null) {
		core.setFailed("The package.json file had no name field.");
		return;
	}

	if (info.version == null) {
		core.setFailed("The package.json file had no version field.");
		return;
	}

	return { name: info.name, version: info.version };
}

async function getVSCEBuildArtifact(config: GithubConfig, info: PackageInformation):
	Promise<GithubReleaseAsset | undefined> {

	if (info == null) {
		return;
	}

	if (config.tag !== `v${ info.version }`) {
		core.setFailed(`Tag version ${ config.tag } does not match package.json version ${ info.version }.`);
		return;
	}

	const filePath = `./${info.name}-${info.version}.vsix`;
	const [status, data] = await utils.readFile(filePath);

	switch (status) {
		case utils.FileReadStatus.SUCCESS:
			break;
		case utils.FileReadStatus.FILE_MISSING:
			core.setFailed("File upload failed as the VSIX file is missing.");
			return;
		case utils.FileReadStatus.NO_READ_ACCESS:
			core.setFailed("File upload failed due to missing read access on the VSIX file.");
			return;
		case utils.FileReadStatus.FAILED_READ:
			core.setFailed("Failed to read VSIX file from disk.");
			return;
		default:
			return utils.assertUnreachable(status);
	}

	if (data == null) {
		core.setFailed("Failed due to not being provided with data on a successful VSIX read.");
		return;
	}

	try {
		const stat = fs.lstatSync(filePath);
		return {
			name: `${info.name}-${info.version}.vsix`,
			mime: "application/zip",
			size: stat.size,
			data
		};
	} catch {
		core.setFailed("Failed to stat the VSIX file.");
		return;
	}
}

async function uploadReleaseAsset(octo: OctoKit, config: GithubConfig, release: GithubRelease,
	info: PackageInformation): Promise<void> {

	const [owner, repo] = [config.owner, config.repo];

	const asset = await getVSCEBuildArtifact(config, info);
	if (asset == null) return;

	await utils.apiTimeout();
	await octo.repos.uploadReleaseAsset({
		owner,
		repo,
		release_id: release.id,
		headers: {
			"content-length": asset.size,
			"content-type": asset.mime
		},
		name: asset.name,
		// @ts-ignore
		data: asset.data
	});
}

async function main() {
	const config = getConfig();
	if (config == null) {
		process.exit(core.ExitCode.Failure);
	}

	const octo = github.getOctokit(config.token);
	await existingDraftDeletion(octo, config);
	await existingReleaseDeletion(octo, config);

	const info = await getPackageInfo();
	if (info == null) {
		process.exit(core.ExitCode.Failure);
	}

	const release = await publishRelease(octo, config, info);
	if (release == null) {
		process.exit(core.ExitCode.Failure);
	}

	await uploadReleaseAsset(octo, config, release, info);
	process.exit(core.ExitCode.Success);
}

main();
