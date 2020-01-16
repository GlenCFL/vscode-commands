/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

import * as vscode from "vscode";

import { mergeLineSharingSelections, selectRightSmartAction } from "./common";

/**
 * A command that expands each selection from their end to include either
 * all of the subsequent text, with any trailing whitespace trimmed, or simply
 * all of the subsequent whitespace on their line(s) within the editor, with the
 * former having higher precedence.
 */
export default async function expandRightSmart() {
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
    newSelections[i] = selectRightSmartAction(editor, newSelections[i]);
  }

  editor.selections = newSelections;
}
