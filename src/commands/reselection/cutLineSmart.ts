/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

import * as vscode from "vscode";

import expandLineSmart from "./expandLineSmart";

/**
 * A command that expands each selection to include either all preceding and
 * subsequent text, with any leading whitespace trimmed, or simply the preceding
 * and subsequent whitespace on their line(s) within the editor. It then copies
 * that newly selected text into the clipboard and deletes it from the editor.
 */
export default async function cutLineSmart() {
  await expandLineSmart();
  await vscode.commands.executeCommand("editor.action.clipboardCutAction");
  return vscode.commands.executeCommand("editor.action.deleteLines");
}
