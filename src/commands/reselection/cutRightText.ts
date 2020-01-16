/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

import * as vscode from "vscode";

import expandRightText from "./expandRightText";

/**
 * A command that expands each selection from their end to include all of the
 * subsequent text, with any trailing whitespace trimmed, on their line(s)
 * within the editor. It then copies that newly selected text into the clipboard
 * and deletes it from the editor.
 */
export default async function cutRightText() {
  await expandRightText();
  return vscode.commands.executeCommand("editor.action.clipboardCutAction");
}
