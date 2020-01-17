/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

import * as vscode from "vscode";

import { mergeLineSharingSelections, selectRightTextAction } from "./common";

/**
 * A command that expands each selection from their end to include all of the
 * subsequent text, with any trailing whitespace trimmed, on their line(s)
 * within the editor.
 */
export async function expandRightText() {
  const editor = vscode.window.activeTextEditor;

  if (!editor || editor.selections.length === 0) {
    return;
  }

  let newSelections: vscode.Selection[];
  if (editor.selections.length > 1) {
    newSelections = mergeLineSharingSelections(editor.selections);
  } else {
    newSelections = [editor.selection];
  }

  for (let i = 0; i < newSelections.length; ++i) {
    newSelections[i] = selectRightTextAction(editor, newSelections[i]);
  }

  editor.selections = newSelections;
}
