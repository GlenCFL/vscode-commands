/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

// Contains common functionality that can be used within any of the reselection
// commands. This code should avoid modifying the active text editor in any way.

import * as vscode from "vscode";

/**
 * Merges any selections which share the same line as another into a single,
 * joined selection. This is useful if there are commands that affect every
 * character to the left or right of a selection, as well as for commands which
 * operate on an entire line.
 *
 * @param selections An array containing all selections from an editor.
 * @returns The resulting selections, which are each guaranteed to span
 *  unique lines within an editor.
 */
export function mergeLineSharingSelections(selections: readonly vscode.Selection[]):
  vscode.Selection[] {

  const output: vscode.Selection[] = [];

  // Selections aren't sorted and appear in the order in which those selections
  // were made. We need these selections to be sorted for the operation that
  // follows, but we also don't want to mutate the selections array in case
  // it's attached to the active text editor.
  const sortedSelections = [...selections].sort((lha, rha) => {
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
  for (let i = 1; i <= sortedSelections.length; i++) {
    const previousSelection = sortedSelections[i - 1];

    // Simply push the last selection on the last iteration of this loop.
    if (i === sortedSelections.length) {
      output.push(previousSelection);
      break;
    }

    const currentSelection = sortedSelections[i];
    if (previousSelection.end.line === currentSelection.start.line) {
      const selectionRange = previousSelection.union(currentSelection);
      sortedSelections[i] = new vscode.Selection(selectionRange.start,
        selectionRange.end);
    } else {
      output.push(previousSelection);
    }
  }

  return output;
}

/** The signature of every selection action. */
export type ReselectionAction = (editor: vscode.TextEditor, selection:
  vscode.Selection) => vscode.Selection;

/**
 * Expands the selection from its start to include everything preceding it on
 * its line within the editor, if there is anything preceding it.
 * @param editor The text editor associated with the selection.
 * @param selection The selection being expanded on.
 * @return The expanded selection.
 */
export const selectLeftAllAction: ReselectionAction = (editor, selection) => {
  const lineRange = editor.document.lineAt(selection.start.line).range;

  if (selection.isEmpty) {
    // Are we on an empty line or at the start of this line? If we are, we don't
    // need to modify the selection whatsoever.
    if (lineRange.end.character === 0 || selection.end.character === 0) {
      return selection;
    }
  }

  const range = new vscode.Range(lineRange.start, selection.end);
  return new vscode.Selection(range.start, range.end);
};

/**
 * Expands the selection from its end to include everything that follows on its
 * line within the editor, if there is anything that follows it.
 * @param editor The text editor associated with the selection.
 * @param selection The selection being expanded on.
 * @return The expanded selection.
 */
export const selectRightAllAction: ReselectionAction = (editor, selection) => {
  const lineRange = editor.document.lineAt(selection.end.line).range;

  if (selection.isEmpty) {
    // Are we on an empty line or at the end of this line? If we are, then we
    // don't need to modify the selection whatsoever.
    if (lineRange.end.character === 0 || selection.start.character ===
      lineRange.end.character) {

      return selection;
    }
  }

  const range = lineRange.with(selection.start);
  return new vscode.Selection(range.start, range.end);
};

/** A regex matching the first non-whitespace character within a string. */
export const leadingTextRegex = /\S/;

/** A regex matching the last non-whitespace character within a string. */
export const trailingTextRegex = /\S\s*$/;

/**
 * Expands the selection from its start to include the text preceding it on its
 * line within the editor, if there is anything preceding it.
 * @param editor The text editor associated with the selection.
 * @param selection The selection being expanded on.
 * @returns The expanded selection.
 */
export const selectLeftTextAction: ReselectionAction = (editor, selection) => {
  const line = editor.document.lineAt(selection.start.line);

  if (selection.isEmpty) {
    // Are we on an empty line or at the start of this line? If we are, we don't
    // need to modify the selection whatsoever.
    if (line.range.end.character === 0 || selection.end.character === 0) {
      return selection;
    }
  }

  const context = line.text.slice(0, selection.start.character);
  const textResult = leadingTextRegex.exec(context);
  if (textResult) {
    const start = new vscode.Position(selection.start.line, textResult.index);

    return new vscode.Selection(start, selection.end);
  } else {
    return selection;
  }
}

/**
 * Expands the selection from its end to include the text that follows on its
 * line within the editor, if there is anything that follows it.
 * @param editor The text editor associated with the selection.
 * @param selection The selection being expanded on.
 * @returns The expanded selection.
 */
export const selectRightTextAction: ReselectionAction = (editor, selection) => {
  const line = editor.document.lineAt(selection.start.line);

  if (selection.isEmpty) {
    // Are we on an empty line or at the end of this line? If we are, then we
    // don't need to modify the selection whatsoever.
    if (line.range.end.character === 0 || selection.start.character ===
      line.range.end.character) {

      return selection;
    }
  }

  const context = line.text.substr(selection.end.character);
  const textResult = trailingTextRegex.exec(context);
  if (textResult) {
    const charOffset = selection.end.character + 1;
    const start = new vscode.Position(selection.start.line, textResult.index +
      charOffset);

    return new vscode.Selection(start, selection.end);
  } else {
    return selection;
  }
}

/**
 * Expands the selection from its start to include either the text preceding it
 * or any leading whitespace on its line within the editor, with the former
 * having higher precedence.
 * @param editor The text editor associated with the selection.
 * @param selection The selection being expanded on.
 * @returns The expanded selection.
 */
export const selectLeftSmartAction: ReselectionAction = (editor, selection) => {
  const line = editor.document.lineAt(selection.start.line);

  if (selection.isEmpty) {
    // Are we on an empty line or at the start of this line? If we are, we don't
    // need to modify the selection whatsoever.
    if (line.range.end.character === 0 || selection.end.character === 0) {
      return selection;
    }
  }

  const context = line.text.slice(0, selection.start.character);
  const textResult = leadingTextRegex.exec(context);
  if (textResult) {
    const start = new vscode.Position(selection.start.line, textResult.index);

    return new vscode.Selection(start, selection.end);
  } else {
    const range = new vscode.Range(line.range.start, selection.end);
    return new vscode.Selection(range.start, range.end);
  }
}

/**
 * Expands the selection from its end to include either the text that follows
 * or any trailing whitespace on its line within the editor, with the former
 * having higher precedence.
 * @param editor The text editor associated with the selection.
 * @param selection The selection being expanded on.
 * @returns The expanded selection.
 */
export const selectRightSmartAction: ReselectionAction = (editor, selection) => {
  const line = editor.document.lineAt(selection.start.line);

  if (selection.isEmpty) {
    // Are we on an empty line or at the end of this line? If we are, then we
    // don't need to modify the selection whatsoever.
    if (line.range.end.character === 0 || selection.start.character ===
      line.range.end.character) {

      return selection;
    }
  }

  const context = line.text.substr(selection.end.character);
  const textResult = trailingTextRegex.exec(context);
  if (textResult) {
    const charOffset = selection.end.character + 1;
    const start = new vscode.Position(selection.start.line, textResult.index +
      charOffset);

    return new vscode.Selection(start, selection.end);
  } else {
    const range = line.range.with(selection.start);
  return new vscode.Selection(range.start, range.end);
  }
}

/**
 * Expands the selection to include all characters that follow or precede it on
 * both the starting line and ending line of the selection within the editor.
 * @param editor The text editor associated with the selection.
 * @param selection The selection being expanded on.
 * @returns The expanded selection.
 */
export const selectLineAllAction: ReselectionAction = (editor, selection) => {
  return selectLeftAllAction(editor, selectRightAllAction(editor, selection));
}

/**
 * Expands the selection to include all preceding text, with any leading
 * or trailing whitespace trimmed, on both the starting line and ending line of
 * the selection within the editor.
 * @param editor The text editor associated with the selection.
 * @param selection The selection being expanded on.
 * @returns The expanded selection.
 */
export const selectLineTextAction: ReselectionAction = (editor, selection) => {
  return selectLeftTextAction(editor, selectRightTextAction(editor, selection));
}

/**
 * Expands the selection to include either all preceding text, with any leading
 * or trailing whitespace trimmed, or simply the preceding whitespace on both
 * the starting line and ending line of the selection within the editor.
 * @param editor The text editor associated with the selection.
 * @param selection The selection being expanded on.
 * @returns The expanded selection.
 */
export const selectLineSmartAction: ReselectionAction = (editor, selection) => {
  return selectLeftSmartAction(editor, selectRightSmartAction(editor, selection));
}
