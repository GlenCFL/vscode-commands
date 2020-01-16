/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

import * as vscode from "vscode";

import expandLineText from "./expandLineText";

/**
 * A command that expands each selection to include all preceding and subsequent
 * text, with any leading whitespace trimmed, on their line(s) within the
 * editor. It then copies that newly selected text into the clipboard and
 * deletes it from the editor.
 */
export default async function cutLineText() {
  await expandLineText();
  await vscode.commands.executeCommand("editor.action.clipboardCutAction");
  return vscode.commands.executeCommand("editor.action.deleteLines");
}
