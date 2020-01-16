/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

import * as vscode from "vscode";

import expandLineAll from "./expandLineAll";

/**
 * A command that expands each selection to include the entire contents of their
 * line(s) within the editor. It then copies that newly selected text into the
 * clipboard.
 */
export default async function copyLineAll() {
  await expandLineAll();
  return vscode.commands.executeCommand("editor.action.clipboardCopyAction");
}
