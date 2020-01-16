/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

import * as vscode from "vscode";

import { mergeLineSharingSelections, selectLeftTextAction } from "./common";

/**
 * A command that expands each selection from their start to include all
 * preceding text, with any leading whitespace trimmed, on their line(s) within
 * the editor.
 */
export default async function expandLeftText() {
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
    newSelections[i] = selectLeftTextAction(editor, newSelections[i]);
  }

  editor.selections = newSelections;
}
