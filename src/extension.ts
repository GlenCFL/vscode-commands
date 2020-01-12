/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

// TODO(glen): write a command that fixes line breaks within a multi-line
//  comment block.
// TODO(glen): revisit whether or not we want selections to be a bit more
//  intelligent or not. We could easily make it so that leading or trailing
//  whitespace is only included if zero non-white characters are found. I don't
//  know if this inconsistency would be annoying in practice though.

import * as vscode from "vscode";

import { copyAllRight, cutAllRight } from "./commands/copyOrCutAllRight";
import { copyLine, cutLine } from "./commands/copyOrCutLine";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("glencfl.copyAllRight", copyAllRight),
    vscode.commands.registerCommand("glencfl.cutAllRight", cutAllRight),
    vscode.commands.registerCommand("glencfl.copyLine", copyLine),
    vscode.commands.registerCommand("glencfl.cutLine", cutLine)
  );
}

export function deactivate() {}
