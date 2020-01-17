/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

import * as vscode from "vscode";

import { expandLeftAll } from "./expandLeftAll";

/**
 * A command that expands each selection from their start to include all
 * preceding characters to the start of their line(s) within the editor. It then
 * copies that newly selected text into the clipboard.
 */
export async function copyLeftAll() {
  await expandLeftAll();
  return vscode.commands.executeCommand("editor.action.clipboardCopyAction");
}
