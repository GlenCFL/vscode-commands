/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

import * as vscode from "vscode";

// A few notes on VSCode behaviors regarding this:
//   - Word-wrapped lines are all considered the same line by the editor,
//     meaning the "cursorEndSelect" command is specifically programmed to
//     select to the end of the -visual- line.
//   - Selections aren't sorted and appear in the order in which those
//     selections were made.
//   - Assigning to either 'TextEditor.selection' or 'TextEditor.selections'
//     does change the selections within that editor.

/**
 * Merges any selections that span the same lines.
 * @param selections An array containing all of the active editor's selections.
 * @returns An array containing the merged selections.
 */
function mergeSelections(selections: vscode.Selection[]): vscode.Selection[] {
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

/**
 * A command that expands each selection to the end of the line, then either
 * copies or cuts that selected text.
 * @param cut If true, this command will cut out the selected text, rather than
 * copying it.
 */
function copyOrCutToEndOfLine(cut: boolean) {
  const editor = vscode.window.activeTextEditor;

  // Just silently exit if we don't have an active text editor with selections.
  if (!editor || editor.selections.length === 0) {
    return;
  }

  // Avoid modifying anything within the text editor until the very end by
  // creating a shallow copy here prior to sorting.
  let selections = [...editor.selections];
  if (selections.length > 1) {
    selections = mergeSelections(selections);
  }

  // Go through each selection, expanding each to the end of the line.
  const outputSelections: vscode.Selection[] = [];
  for (const selection of selections) {
    const selectedLine = editor.document.lineAt(selection.end.line).range;

    if (selection.end.character === selectedLine.end.character) {
      outputSelections.push(selection);
    } else {
      outputSelections.push(new vscode.Selection(
        new vscode.Position(selectedLine.end.line, selection.end.character),
        new vscode.Position(selectedLine.end.line, selectedLine.end.character)
      ));
    }
  }

  editor.selections = outputSelections;

  // Finally, execute the appropriate clipboard command.
  if (cut) {
    vscode.commands.executeCommand("editor.action.clipboardCutAction");
  } else {
    vscode.commands.executeCommand("editor.action.clipboardCopyAction");
  }
}

export function copyToEndOfLine() {
  copyOrCutToEndOfLine(false);
}

export function cutToEndOfLine() {
  copyOrCutToEndOfLine(true);
}
