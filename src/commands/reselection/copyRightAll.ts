/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

import * as vscode from "vscode";

import expandRightAll from "./expandRightAll";

/**
 * A command that expands each selection from their end to include all of the
 * subsequent characters to the end of their line(s) within the editor. It then
 * copies that newly selected text into the clipboard.
 */
export default async function copyRightAll() {
  await expandRightAll();
  return vscode.commands.executeCommand("editor.action.clipboardCopyAction");
}
