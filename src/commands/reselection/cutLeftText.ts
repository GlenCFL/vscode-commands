/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

import * as vscode from "vscode";

import expandLeftText from "./expandLeftText";

/**
 * A command that expands each selection from their start to include all
 * preceding text, with any leading whitespace trimmed, on their line(s) within
 * the editor. It then copies that newly selected text into the clipboard and
 * deletes it from the editor.
 */
export default async function cutLeftText() {
  await expandLeftText();
  return vscode.commands.executeCommand("editor.action.clipboardCutAction");
}
