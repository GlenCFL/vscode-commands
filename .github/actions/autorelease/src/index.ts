/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

import * as core from "@actions/core";
import * as github from "@actions/github";

import { env } from "process";

type OctoKit = ReturnType<typeof github.getOctokit>;

interface GithubRelease {
	id: number;
	upload_url: string;
	html_url: string;
	tag_name: string;
	body: string;
	target_commitish: string;
}

interface GithubConfig {
	token: string;
	sha: string;
	reference: string;
	repository: string;
	prerelease: boolean;
}

function getConfig(): GithubConfig | undefined {
	const ensure = (v: string): boolean =>  {
		if (env[v] == null) {
			core.setFailed(`Required environment variable ${ v } was unset.`);
			return false;
		} else {
			return true;
		}
	};

	if (ensure("GITHUB_TOKEN") && ensure("GITHUB_SHA") && ensure("GITHUB_REF") && ensure("GITHUB_REPOSITORY")) {
		return {
			token: env.GITHUB_TOKEN as string,
			sha: env.GITHUB_SHA as string,
			reference: env.GITHUB_REF as string,
			repository: env.GITHUB_REPOSITORY as string,
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
	const [ owner, repo ] = config.repository.split("/");
	const tag = config.reference.replace("refs/tags/", "");

	try {
		const release = await octo.repos.getReleaseByTag({ owner, repo, tag });
		await timeout(apiTimeout);
		core.warning(`An existing release for ${ config.reference } was deleted.`);
		octo.repos.deleteRelease({ owner, repo, release_id: release.data.id });
		await timeout(apiTimeout);
		return existingReleaseDeletion(octo, config);
	} catch {
		return;
	}
}

async function existingDraftDeletion(octo: OctoKit, config: GithubConfig): Promise<void> {
	const [ owner, repo ] = config.repository.split("/");
	const iterator = octo.paginate.iterator<GithubRelease>(octo.repos.listReleases.endpoint.merge({ per_page: 100,
		owner, repo }));

	let release: GithubRelease | undefined;
	for await (const response of iterator) {
		let result = response.data.find(release => release.tag_name === config.reference);
		if (result) {
			release = result;
			break;
		}
	}

	if (release != null) {
		await timeout(apiTimeout);
		octo.repos.deleteRelease({ owner, repo, release_id: release.id });
	}
}

async function main() {
	const config = getConfig();
	if (config == null) return;

	const octo = github.getOctokit(config.token);
	await timeout(apiTimeout);
	await existingDraftDeletion(octo, config);
	await timeout(apiTimeout);
	await existingReleaseDeletion(octo, config);
	console.log("Good times.");
}

main();
