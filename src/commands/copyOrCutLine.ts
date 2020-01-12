/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

// A command that expands each selection both to the beginning and end of its
// line(s), then either copies or cuts that selected text.

// TODO(glen): review in which scenarios we want the newlines cut as well.

import * as vscode from "vscode";

import { expandSelections, SelectionAction } from "../selections";

const selectLineAction: SelectionAction = (editor, selection, result) => {
  if (selection.start.line === selection.end.line) {
    const selectedLine = editor.document.lineAt(selection.end.line).range;
    const noPrefix = selection.start.isEqual(selectedLine.start);
    const noSuffix = selection.end.isEqual(selectedLine.end);

    if (noPrefix && noSuffix) {
      // Is the selection on an empty line or does it span the entire line?
      if (selection.start.isEqual(selection.end)) {
        return;
      } else {
        result.push(selection);
      }
    } else {
      result.push(new vscode.Selection(selectedLine.start, selectedLine.end));
    }
  } else {
    const firstLine = editor.document.lineAt(selection.start.line).range;
    const lastLine = editor.document.lineAt(selection.end.line).range;
    const noPrefix = selection.start.isEqual(firstLine.start);
    const noSuffix = selection.end.isEqual(lastLine.end);

    if (noPrefix && noSuffix) {
      return;
    } else {
      result.push(new vscode.Selection(firstLine.start, lastLine.end));
    }
  }
};

export function copyLine() {
  if (expandSelections(selectLineAction)) {
    vscode.commands.executeCommand("editor.action.clipboardCopyAction");
  }
}

export function cutLine() {
  if (expandSelections(selectLineAction)) {
    vscode.commands.executeCommand("editor.action.clipboardCutAction")
  }
}
