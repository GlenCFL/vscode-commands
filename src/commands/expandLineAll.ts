/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

import * as vscode from "vscode";

import { mergeLineSharingSelections, selectLineAllAction } from "./common";

/**
 * A command that expands each selection to include the entire contents of their
 * line(s) within the editor.
 */
export async function expandLineAll() {
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
    newSelections[i] = selectLineAllAction(editor, newSelections[i]);
  }

  editor.selections = newSelections;
}
