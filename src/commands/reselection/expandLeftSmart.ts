/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

import * as vscode from "vscode";

import { mergeLineSharingSelections, selectLeftSmartAction } from "./common";

/**
 * A command that expands each selection from their start to include either
 * all preceding text, with any leading whitespace trimmed, or simply the
 * preceding whitespace on their line(s) within the editor, with the former
 * having higher precedence.
 */
export default async function expandLeftSmart() {
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
    newSelections[i] = selectLeftSmartAction(editor, newSelections[i]);
  }

  editor.selections = newSelections;
}
