/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

// A command that expands each selection to the end of its line(s), then either
// copies or cuts that selected text.

import * as vscode from "vscode";

import { expandSelections, SelectionAction } from "../selections";

const selectRightAction: SelectionAction = (editor, selection, result) => {
  const selectedLine = editor.document.lineAt(selection.end.line).range;

  if (selection.start.isEqual(selectedLine.end)) {
    return;
  }

  const range = selectedLine.with(selection.start);
  const newSelection = new vscode.Selection(range.start, range.end);
  result.push(newSelection);
};

export function copyAllRight() {
  if (expandSelections(selectRightAction)) {
    vscode.commands.executeCommand("editor.action.clipboardCopyAction");
  }
}

export function cutAllRight() {
  if (expandSelections(selectRightAction)) {
    vscode.commands.executeCommand("editor.action.clipboardCutAction");
  }
}
