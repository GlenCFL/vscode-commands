/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

import * as vscode from "vscode";

import expandLeftSmart from "./expandLeftSmart";

/**
 * A command that expands each selection from their start to include either
 * all preceding text, with any leading whitespace trimmed, or simply the
 * preceding whitespace on their line(s) within the editor, with the former
 * having higher precedence. It then copies that newly selected text into the
 * clipboard and deletes it from the editor.
 */
export default async function cutLeftSmart() {
  await expandLeftSmart();
  return vscode.commands.executeCommand("editor.action.clipboardCutAction");
}
