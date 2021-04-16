/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

import * as core from "@actions/core";
import * as github from "@actions/github";

import { env } from "process";
import * as fs from "fs";

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

const apiTimeout = 250;
async function timeout(milliseconds: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, milliseconds);
	});
}

async function existingReleaseDeletion(octo: OctoKit, config: GithubConfig): Promise<void> {
	const tag = config.reference.replace("refs/tags/", "");

	try {
		const [owner, repo] = [config.owner, config.repo];
		await timeout(apiTimeout);
		const release = await octo.repos.getReleaseByTag({ owner, repo, tag });
		await timeout(apiTimeout);
		core.warning(`An existing release for ${config.tag} was deleted.`);
		await octo.repos.deleteRelease({ owner, repo, release_id: release.data.id });
		await timeout(apiTimeout);
		return existingReleaseDeletion(octo, config);
	} catch {
		return;
	}
}

async function existingDraftDeletion(octo: OctoKit, config: GithubConfig): Promise<void> {
	const [owner, repo] = [config.owner, config.repo];

	await timeout(apiTimeout);
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
		await timeout(apiTimeout);
		core.warning(`An existing draft for ${config.tag} was deleted.`);
		await octo.repos.deleteRelease({ owner, repo, release_id: release.id });
		return existingDraftDeletion(octo, config);
	}
}

function fileExists(filePath: string): Promise<boolean> {
	return new Promise(resolve => {
		fs.access(filePath, fs.constants.F_OK, (err) => {
			err == null ? resolve(true) : resolve(false);
		});
	});
}

function hasReadAccess(filePath: string): Promise<boolean> {
	return new Promise(resolve => {
		fs.access(filePath, fs.constants.F_OK | fs.constants.R_OK, (err) => {
			err == null ? resolve(true) : resolve(false);
		});
	});
}

function splitLines(text: string, lineBreaks?: boolean): string[] {
	if (lineBreaks) {
		const splitResult = text.split(/([^\n]*(?:\r?\n|$))/g);
		const filterResult = splitResult.filter(value => value.length !== 0);

		// We lose the last line if it's completely empty above, so we need to add it
		// back in.
		const index = text.lastIndexOf("\n") + 1;
		if (text[index] === undefined) {
			filterResult.push("");
		}

		return filterResult;
	} else {
		return text.split(/\r?\n/g);
	}
}

async function parseChangeLog(config: GithubConfig, info: PackageInformation): Promise<string | undefined> {
	const logPath = "./CHANGELOG.md";

	if (!await fileExists(logPath)) {
		core.setFailed("Missing CHANGELOG.md at repository root.");
		return;
	}

	if (!await hasReadAccess(logPath)) {
		core.setFailed("No read access on CHANGELOG.md at repository root.");
		return;
	}

	let data: string | undefined;
	try {
		data = fs.readFileSync(logPath).toString();
	} catch {
		core.setFailed("Failed to read CHANGELOG.md file from disk.");
		return;
	}

	const lines = splitLines(data);
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

	await timeout(apiTimeout);

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
	if (!await fileExists(packageFilePath)) {
		core.setFailed("Missing package.json file at repository root.");
		return;
	}

	if (!await hasReadAccess(packageFilePath)) {
		core.setFailed("No read access on package.json file at repository root.");
		return;
	}

	let data: string | undefined;
	try {
		data = fs.readFileSync(packageFilePath).toString();
	} catch {
		core.setFailed("Failed to read package.json file from disk.");
		return;
	}

	let info: Partial<PackageInformation>;
	try {
		info = JSON.parse(data);
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

	try {
		const filePath = `./${info.name}-${info.version}.vsix`;

		if (!await fileExists(filePath)) {
			core.setFailed("File upload failed as the VSIX file is missing.");
			return;
		}

		if (!await hasReadAccess(filePath)) {
			core.setFailed("File upload failed due to missing read access on the VSIX file.");
			return;
		}

		const stat = fs.lstatSync(filePath);
		const data = fs.readFileSync(filePath);

		return {
			name: `${info.name}-${info.version}.vsix`,
			mime: "application/zip",
			size: stat.size,
			data
		};
	} catch {
		return;
	}
}

async function uploadReleaseAsset(octo: OctoKit, config: GithubConfig, release: GithubRelease,
	info: PackageInformation): Promise<void> {

	const [owner, repo] = [config.owner, config.repo];

	const asset = await getVSCEBuildArtifact(config, info);
	if (asset == null) return;

	await timeout(apiTimeout);
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
