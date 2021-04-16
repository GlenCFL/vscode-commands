/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

import * as fs from "fs";

export function assertUnreachable(_: never): never {
	return _;
}

export async function timeout(milliseconds: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, milliseconds);
	});
}

export async function apiTimeout(): Promise<void> {
	return timeout(250);
}

export function splitLines(text: string, lineBreaks?: boolean): string[] {
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

export function fileExists(filePath: string): Promise<boolean> {
	return new Promise(resolve => {
		fs.access(filePath, fs.constants.F_OK, (err) => {
			err == null ? resolve(true) : resolve(false);
		});
	});
}

export function hasReadAccess(filePath: string): Promise<boolean> {
	return new Promise(resolve => {
		fs.access(filePath, fs.constants.F_OK | fs.constants.R_OK, (err) => {
			err == null ? resolve(true) : resolve(false);
		});
	});
}

export enum FileReadStatus {
	SUCCESS,
	FILE_MISSING,
	NO_READ_ACCESS,
	FAILED_READ
}

export async function readFile(filePath: string): Promise<[FileReadStatus, Buffer | undefined]> {

	if (!await fileExists(filePath)) {
		return [FileReadStatus.FILE_MISSING, undefined];
	}

	if (!await hasReadAccess(filePath)) {
		return [FileReadStatus.NO_READ_ACCESS, undefined];
	}

	let data: Buffer;
	try {
		data =  fs.readFileSync(filePath);
	} catch {
		return [FileReadStatus.FAILED_READ, undefined];
	}

	return [FileReadStatus.SUCCESS, data];
}
