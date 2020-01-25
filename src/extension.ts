/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

import * as vscode from "vscode";

import { copyLeftAll } from "./commands/copy-left-all";
import { copyLeftSmart } from "./commands/copy-left-smart";
import { copyLeftText } from "./commands/copy-left-text";

import { copyLineAll } from "./commands/copy-line-all";
import { copyLineSmart } from "./commands/copy-line-smart";
import { copyLineText } from "./commands/copy-line-text";

import { copyRightAll } from "./commands/copy-right-all";
import { copyRightSmart } from "./commands/copy-right-smart";
import { copyRightText } from "./commands/copy-right-text";

import { cutLeftAll } from "./commands/cut-left-all";
import { cutLeftSmart } from "./commands/cut-left-smart";
import { cutLeftText } from "./commands/cut-left-text";

import { cutLineAll } from "./commands/cut-line-all";
import { cutLineSmart } from "./commands/cut-line-smart";
import { cutLineText } from "./commands/cut-line-text";

import { cutRightAll } from "./commands/cut-right-all";
import { cutRightSmart } from "./commands/cut-right-smart";
import { cutRightText } from "./commands/cut-right-text";

import { expandLeftAll } from "./commands/expand-left-all";
import { expandLeftSmart } from "./commands/expand-left-smart";
import { expandLeftText } from "./commands/expand-left-text";

import { expandLineAll } from "./commands/expand-line-all";
import { expandLineSmart } from "./commands/expand-line-smart";
import { expandLineText } from "./commands/expand-line-text";

import { expandRightAll } from "./commands/expand-right-all";
import { expandRightSmart } from "./commands/expand-right-smart";
import { expandRightText } from "./commands/expand-right-text";

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
