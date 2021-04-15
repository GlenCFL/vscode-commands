/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

import * as core from "@actions/core";
import * as github from "@actions/github";

import { env } from "process";

type OctoKit = ReturnType<typeof github.getOctokit>;

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
			core.setFailed(`Required environment variable ${ v } was not set.`);
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

async function existingReleaseDeletion(octo: OctoKit, config: GithubConfig): Promise<boolean> {
	const [ owner, repo ] = config.repository.split("/");
	const tag = config.reference.replace("refs/tags/", "");

	try {
		const release = await octo.repos.getReleaseByTag({ owner, repo, tag });
		if (release != null) {
			octo.repos.deleteRelease({ owner, repo, release_id: release.data.id });
		} else {
			core.warning("Getting a release which doesn't exist just returns undefined.");
		}
	} catch {
		core.warning("Getting a release which doesn't exist throws.");
	}

	return true;
}

async function main() {
	const config = getConfig();
	if (config == null) return;

	let octo: OctoKit;
	if (config.token == null) {
		core.setFailed("Action was not given a token.");
		return;
	} else {
		octo = github.getOctokit(config.token);
	}
	
	if (await existingReleaseDeletion(octo, config)) {
		console.log("Good times.");
	} else {
		core.setFailed("Bad times.");
	}
}

main();
