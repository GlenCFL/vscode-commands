/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

// A few notes on VSCode behaviors regarding this:
//   - Word-wrapped lines are all considered the same line by the editor,
//     meaning the "cursorEndSelect" command is specifically programmed to
//     select to the end of the -visual- line.
//   - Selections aren't sorted and appear in the order in which those
//     selections were made.
//   - Assigning to either 'TextEditor.selection' or 'TextEditor.selections'
//     does change the selections within that editor.

import * as vscode from "vscode";

/**
 * Merges any selections that span the same lines.
 * @param selections An array containing all of the active editor's selections.
 * @returns An array containing the merged selections.
 */
export function mergeSelections(selections: vscode.Selection[]):
  vscode.Selection[] {

  const output: vscode.Selection[] = [];

  // Selections need to be sorted by their starting line first, then by their
  // starting character.
  selections.sort((lha, rha) => {
    if (lha.start.line === rha.start.line) {
      if (lha.start.character === rha.start.character) {
        return 0;
      } else if (lha.start.character > rha.start.character) {
        return 1;
      } else {
        return -1;
      }
    } else if (lha.start.line > rha.start.line) {
      return 1;
    } else {
      return -1;
    }
  });

  // Compare the end point of the first selection to the starting point of the
  // one that follows. If they fall on the same line, then those selections
  // should be merged.
  for (let i = 1; i <= selections.length; i++) {
    const previousSelection = selections[i - 1];

    // Simply push the last selection on the last iteration of this loop.
    if (i === selections.length) {
      output.push(previousSelection);
      break;
    }

    const currentSelection = selections[i];
    if (previousSelection.end.line === currentSelection.start.line) {
      const selectionRange = previousSelection.union(currentSelection);
      selections[i] = new vscode.Selection(selectionRange.start, selectionRange.end);
    } else {
      output.push(previousSelection);
    }
  }

  return output;
}

/** The signature of the function to be executed on each selection. */
export type SelectionAction = (editor: vscode.TextEditor, selection:
  vscode.Selection, result: vscode.Selection[]) => void;

/**
 * Expands all selections within the active text editor by invoking the provided
 * action on each of those selections.
 * @param action The action to be invoked on each selection within the editor.
 * @returns A boolean indicating whether or not selections were made.
 */
export function expandSelections(action: SelectionAction): boolean {
  const editor = vscode.window.activeTextEditor;

  // Just silently exit if we don't have an active text editor with selections.
  if (!editor || editor.selections.length === 0) {
    return false;
  }

  // Avoid modifying anything within the text editor until the very end by
  // creating a shallow copy here prior to sorting.
  let selections = [...editor.selections];
  if (selections.length > 1) {
    selections = mergeSelections(selections);
  }

  // Go through each selection, performing the provided action on each.
  const outputSelections: vscode.Selection[] = [];
  for (const selection of selections) {
    action(editor, selection, outputSelections);
  }

  if (outputSelections.length === 0) {
    return false;
  } else {
    editor.selections = outputSelections;
    return true;
  }
}
