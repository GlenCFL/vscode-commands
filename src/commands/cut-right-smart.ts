/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

import * as vscode from "vscode";

import { expandRightSmart } from "./expand-right-smart";

/**
 * A command that expands each selection from their end to include either
 * all of the subsequent text, with any trailing whitespace trimmed, or simply
 * all of the subsequent whitespace on their line(s) within the editor, with the
 * former having higher precedence. It then copies that newly selected text into
 * the clipboard and deletes it from the editor.
 */
export async function cutRightSmart() {
  await expandRightSmart();
  return vscode.commands.executeCommand("editor.action.clipboardCutAction");
}
