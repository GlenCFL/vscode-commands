/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

import * as vscode from "vscode";

// Reselection Commands =======================================================
import { copyLeftAll } from "./commands/copyLeftAll";
import { copyLeftSmart } from "./commands/copyLeftSmart";
import { copyLeftText } from "./commands/copyLeftText";

import { copyLineAll } from "./commands/copyLineAll";
import { copyLineSmart } from "./commands/copyLineSmart";
import { copyLineText } from "./commands/copyLineText";

import { copyRightAll } from "./commands/copyRightAll";
import { copyRightSmart } from "./commands/copyRightSmart";
import { copyRightText } from "./commands/copyRightText";

import { cutLeftAll } from "./commands/cutLeftAll";
import { cutLeftSmart } from "./commands/cutLeftSmart";
import { cutLeftText } from "./commands/cutLeftText";

import { cutLineAll } from "./commands/cutLineAll";
import { cutLineSmart } from "./commands/cutLineSmart";
import { cutLineText } from "./commands/cutLineText";

import { cutRightAll } from "./commands/cutRightAll";
import { cutRightSmart } from "./commands/cutRightSmart";
import { cutRightText } from "./commands/cutRightText";

import { expandLeftAll } from "./commands/expandLeftAll";
import { expandLeftSmart } from "./commands/expandLeftSmart";
import { expandLeftText } from "./commands/expandLeftText";

import { expandLineAll } from "./commands/expandLineAll";
import { expandLineSmart } from "./commands/expandLineSmart";
import { expandLineText } from "./commands/expandLineText";

import { expandRightAll } from "./commands/expandRightAll";
import { expandRightSmart } from "./commands/expandRightSmart";
import { expandRightText } from "./commands/expandRightText";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("reselection.copyLeftAll", copyLeftAll),
    vscode.commands.registerCommand("reselection.copyLeftSmart", copyLeftSmart),
    vscode.commands.registerCommand("reselection.copyLeftText", copyLeftText),

    vscode.commands.registerCommand("reselection.copyLineAll", copyLineAll),
    vscode.commands.registerCommand("reselection.copyLineSmart", copyLineSmart),
    vscode.commands.registerCommand("reselection.copyLineText", copyLineText),

    vscode.commands.registerCommand("reselection.copyRightAll", copyRightAll),
    vscode.commands.registerCommand("reselection.copyRightSmart", copyRightSmart),
    vscode.commands.registerCommand("reselection.copyRightText", copyRightText),

    vscode.commands.registerCommand("reselection.cutLeftAll", cutLeftAll),
    vscode.commands.registerCommand("reselection.cutLeftSmart", cutLeftSmart),
    vscode.commands.registerCommand("reselection.cutLeftText", cutLeftText),

    vscode.commands.registerCommand("reselection.cutLineAll", cutLineAll),
    vscode.commands.registerCommand("reselection.cutLineSmart", cutLineSmart),
    vscode.commands.registerCommand("reselection.cutLineText", cutLineText),

    vscode.commands.registerCommand("reselection.cutRightAll", cutRightAll),
    vscode.commands.registerCommand("reselection.cutRightSmart", cutRightSmart),
    vscode.commands.registerCommand("reselection.cutRightText", cutRightText),

    vscode.commands.registerCommand("reselection.expandLeftAll", expandLeftAll),
    vscode.commands.registerCommand("reselection.expandLeftSmart", expandLeftSmart),
    vscode.commands.registerCommand("reselection.expandLeftText", expandLeftText),

    vscode.commands.registerCommand("reselection.expandLineAll", expandLineAll),
    vscode.commands.registerCommand("reselection.expandLineSmart", expandLineSmart),
    vscode.commands.registerCommand("reselection.expandLineText", expandLineText),

    vscode.commands.registerCommand("reselection.expandRightAll", expandRightAll),
    vscode.commands.registerCommand("reselection.expandRightSmart", expandRightSmart),
    vscode.commands.registerCommand("reselection.expandRightText", expandRightText)
  );
}

export function deactivate() {}
