/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

// TODO(glen): write a command that fixes line breaks within a multi-line comment block.

import * as vscode from "vscode";

import { copyToEndOfLine, cutToEndOfLine } from "./commands/copyOrCutToEndOfLine";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("glencfl.copyToEndOfLine", copyToEndOfLine),
    vscode.commands.registerCommand("glencfl.cutToEndOfLine", cutToEndOfLine)
  );
}

export function deactivate() {}
