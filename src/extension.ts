/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

import * as vscode from "vscode";

// Reselection Commands =======================================================
import copyLeftAll from "./commands/reselection/copyLeftAll";
import copyLeftSmart from "./commands/reselection/copyLeftSmart";
import copyLeftText from "./commands/reselection/copyLeftText";

import copyLineAll from "./commands/reselection/copyLineAll";
import copyLineSmart from "./commands/reselection/copyLineSmart";
import copyLineText from "./commands/reselection/copyLineText";

import copyRightAll from "./commands/reselection/copyRightAll";
import copyRightSmart from "./commands/reselection/copyRightSmart";
import copyRightText from "./commands/reselection/copyRightText";

import cutLeftAll from "./commands/reselection/cutLeftAll";
import cutLeftSmart from "./commands/reselection/cutLeftSmart";
import cutLeftText from "./commands/reselection/cutLeftText";

import cutLineAll from "./commands/reselection/cutLineAll";
import cutLineSmart from "./commands/reselection/cutLineSmart";
import cutLineText from "./commands/reselection/cutLineText";

import cutRightAll from "./commands/reselection/cutRightAll";
import cutRightSmart from "./commands/reselection/cutRightSmart";
import cutRightText from "./commands/reselection/cutRightText";

import expandLeftAll from "./commands/reselection/expandLeftAll";
import expandLeftSmart from "./commands/reselection/expandLeftSmart";
import expandLeftText from "./commands/reselection/expandLeftText";

import expandLineAll from "./commands/reselection/expandLineAll";
import expandLineSmart from "./commands/reselection/expandLineSmart";
import expandLineText from "./commands/reselection/expandLineText";

import expandRightAll from "./commands/reselection/expandRightAll";
import expandRightSmart from "./commands/reselection/expandRightSmart";
import expandRightText from "./commands/reselection/expandRightText";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("glencfl.copyLeftAll", copyLeftAll),
    vscode.commands.registerCommand("glencfl.copyLeftSmart", copyLeftSmart),
    vscode.commands.registerCommand("glencfl.copyLeftText", copyLeftText),

    vscode.commands.registerCommand("glencfl.copyLineAll", copyLineAll),
    vscode.commands.registerCommand("glencfl.copyLineSmart", copyLineSmart),
    vscode.commands.registerCommand("glencfl.copyLineText", copyLineText),

    vscode.commands.registerCommand("glencfl.copyRightAll", copyRightAll),
    vscode.commands.registerCommand("glencfl.copyRightSmart", copyRightSmart),
    vscode.commands.registerCommand("glencfl.copyRightText", copyRightText),

    vscode.commands.registerCommand("glencfl.cutLeftAll", cutLeftAll),
    vscode.commands.registerCommand("glencfl.cutLeftSmart", cutLeftSmart),
    vscode.commands.registerCommand("glencfl.cutLeftText", cutLeftText),

    vscode.commands.registerCommand("glencfl.cutLineAll", cutLineAll),
    vscode.commands.registerCommand("glencfl.cutLineSmart", cutLineSmart),
    vscode.commands.registerCommand("glencfl.cutLineText", cutLineText),

    vscode.commands.registerCommand("glencfl.cutRightAll", cutRightAll),
    vscode.commands.registerCommand("glencfl.cutRightSmart", cutRightSmart),
    vscode.commands.registerCommand("glencfl.cutRightText", cutRightText),

    vscode.commands.registerCommand("glencfl.expandLeftAll", expandLeftAll),
    vscode.commands.registerCommand("glencfl.expandLeftSmart", expandLeftSmart),
    vscode.commands.registerCommand("glencfl.expandLeftText", expandLeftText),

    vscode.commands.registerCommand("glencfl.expandLineAll", expandLineAll),
    vscode.commands.registerCommand("glencfl.expandLineSmart", expandLineSmart),
    vscode.commands.registerCommand("glencfl.expandLineText", expandLineText),

    vscode.commands.registerCommand("glencfl.expandRightAll", expandRightAll),
    vscode.commands.registerCommand("glencfl.expandRightSmart", expandRightSmart),
    vscode.commands.registerCommand("glencfl.expandRightText", expandRightText)
  );
}

export function deactivate() {}
