/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

import * as vscode from "vscode";

import { expandLeftAll } from "./expand-left-all";

/**
 * A command that expands each selection from their start to include all
 * preceding characters to the start of their line(s) within the editor. It then
 * copies that newly selected text into the clipboard and deletes it from the
 * editor.
 */
export async function cutLeftAll() {
  await expandLeftAll();
  return vscode.commands.executeCommand("editor.action.clipboardCutAction");
}
