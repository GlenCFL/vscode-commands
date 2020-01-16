## GlenCFL's VSCode Commands

This extension includes several commands that I found to be missing from [Visual Studio Code](https://code.visualstudio.com/) by default.

---

## Table of Contents

- [Reselection Commands](#reselection-commands)
  + [Expand Left](#expand-left)
    - [Expand Left All](#expand-left-all)
    - [Expand Left Text](#expand-left-text)
    - [Expand Left Smart](#expand-left-smart)
  + [Expand Right](#expand-right)
    - [Expand Right All](#expand-right-all)
    - [Expand Right Text](#expand-right-text)
    - [Expand Right Smart](#expand-right-smart)
  + [Expand Line](#expand-line)
    - [Expand Line All](#expand-line-all)
    - [Expand Line Text](#expand-line-text)
    - [Expand Line Smart](#expand-line-smart)
  + [Copy Left](#copy-left)
    - [Copy Left All](#copy-left-all)
    - [Copy Left Text](#copy-left-text)
    - [Copy Left Smart](#copy-left-smart)
  + [Copy Right](#copy-right)
    - [Copy Right All](#copy-right-all)
    - [Copy Right Text](#copy-right-text)
    - [Copy Right Smart](#copy-right-smart)
  + [Copy Line](#copy-line)
    - [Copy Line All](#copy-line-all)
    - [Copy Line Text](#copy-line-text)
    - [Copy Line Smart](#copy-line-smart)
  + [Cut Left](#cut-left)
    - [Cut Left All](#cut-left-all)
    - [Cut Left Text](#cut-left-text)
    - [Cut Left Smart](#cut-left-smart)
  + [Cut Right](#cut-right)
    - [Cut Right All](#cut-right-all)
    - [Cut Right Text](#cut-right-text)
    - [Cut Right Smart](#cut-right-smart)
  + [Cut Line](#cut-line)
    - [Cut Line All](#cut-line-all)
    - [Cut Line Text](#cut-line-text)
    - [Cut Line Smart](#cut-line-smart)

---

## Reselection Commands

A series of commands that manipulate your selections within the editor, with variants that will follow up those selection modifications with either the `Clipboard Copy` command or the `Clipboard Cut` command.

### Expand Left

#### Expand Left All

>Identifier: `glencfl.expandLeftAll`

A command that expands each selection from their start to include all preceding characters to the start of their line(s) within the editor.

#### Expand Left Text

>Identifier: `glencfl.expandLeftText`

A command that expands each selection from their start to include all preceding
text, with any leading whitespace trimmed, on their line(s) within the editor.
It then copies that newly selected text into the clipboard.

#### Expand Left Smart

>Identifier: `glencfl.expandLeftSmart`

A command that expands each selection from their start to include either all preceding text, with any leading whitespace trimmed, or simply the preceding whitespace on their line(s) within the editor, with the former having higher precedence.

### Expand Right

#### Expand Right All

>Identifier: `glencfl.expandRightAll`

A command that expands each selection from their end to include all of the subsequent characters to the end of their line(s) within the editor.

#### Expand Right Text

>Identifier: `glencfl.expandRightText`

A command that expands each selection from their end to include all of the subsequent text, with any trailing whitespace trimmed, on their line(s) within the editor.

#### Expand Right Smart

>Identifier: `glencfl.expandRightSmart`

A command that expands each selection from their end to include either all of the subsequent text, with any trailing whitespace trimmed, or simply all of the subsequent whitespace on their line(s) within the editor, with the former having higher precedence.

### Expand Line

#### Expand Line All

>Identifier: `glencfl.expandLineAll`

A command that expands each selection to include the entire contents of their line(s) within the editor.

#### Expand Line Text

>Identifier: `glencfl.expandLineText`

A command that expands each selection to include all preceding and subsequent text, with any leading whitespace trimmed, on their line(s) within the editor.

#### Expand Line Smart

>Identifier: `glencfl.expandLineSmart`

A command that expands each selection to include either all preceding and subsequent text, with any leading whitespace trimmed, or simply the preceding and subsequent whitespace on their line(s) within the editor.

### Copy Left

#### Copy Left All

>Identifier: `glencfl.copyLeftAll`

A command that expands each selection from their start to include all preceding characters to the start of their line(s) within the editor. It then copies that newly selected text into the clipboard.

#### Copy Left Text

>Identifier: `glencfl.copyLeftText`

A command that expands each selection from their start to include all preceding
text, with any leading whitespace trimmed, on their line(s) within the editor.
It then copies that newly selected text into the clipboard.

#### Copy Left Smart

>Identifier: `glencfl.copyLeftSmart`

A command that expands each selection from their start to include either all preceding text, with any leading whitespace trimmed, or simply the preceding whitespace on their line(s) within the editor, with the former having higher precedence. It then copies that newly selected text into the clipboard.

### Copy Right

#### Copy Right All

>Identifier: `glencfl.copyRightAll`

A command that expands each selection from their end to include all of the subsequent characters to the end of their line(s) within the editor. It then copies that newly selected text into the clipboard.

#### Copy Right Text

>Identifier: `glencfl.copyRightText`

A command that expands each selection from their end to include all of the subsequent text, with any trailing whitespace trimmed, on their line(s) within the editor. It then copies that newly selected text into the clipboard.

#### Copy Right Smart

>Identifier: `glencfl.copyRightSmart`

A command that expands each selection from their end to include either all of the subsequent text, with any trailing whitespace trimmed, or simply all of the subsequent whitespace on their line(s) within the editor, with the former having higher precedence. It then copies that newly selected text into the clipboard.

### Copy Line

#### Copy Line All

>Identifier: `glencfl.copyLineAll`

A command that expands each selection to include the entire contents of their line(s) within the editor. It then copies that newly selected text into the clipboard.

#### Copy Line Text

>Identifier: `glencfl.copyLineText`

A command that expands each selection to include all preceding and subsequent text, with any leading whitespace trimmed, on their line(s) within the editor. It then copies that newly selected text into the clipboard.

#### Copy Line Smart

>Identifier: `glencfl.copyLineSmart`

A command that expands each selection to include either all preceding and subsequent text, with any leading whitespace trimmed, or simply the preceding and subsequent whitespace on their line(s) within the editor. It then copies that newly selected text into the clipboard.

### Cut Left

#### Cut Left All

>Identifier: `glencfl.cutLeftAll`

A command that expands each selection from their start to include all preceding characters to the start of their line(s) within the editor. It then copies that newly selected text into the clipboard and deletes it from the editor.

#### Cut Left Text

>Identifier: `glencfl.cutLeftText`

A command that expands each selection from their start to include all preceding text, with any leading whitespace trimmed, on their line(s) within the editor. It then copies that newly selected text into the clipboard and deletes it from the editor.

#### Cut Left Smart

>Identifier: `glencfl.cutLeftSmart`

A command that expands each selection from their start to include either all preceding text, with any leading whitespace trimmed, or simply the preceding whitespace on their line(s) within the editor, with the former having higher precedence. It then copies that newly selected text into the clipboard and deletes it from the editor.

### Cut Right

#### Cut Right All

>Identifier: `glencfl.cutRightAll`

A command that expands each selection from their end to include all of the subsequent characters to the end of their line(s) within the editor. It then copies that newly selected text into the clipboard.

#### Cut Right Text

>Identifier: `glencfl.cutRightText`

A command that expands each selection from their end to include all of the subsequent text, with any trailing whitespace trimmed, on their line(s) within the editor. It then copies that newly selected text into the clipboard.

#### Cut Right Smart

>Identifier: `glencfl.cutRightSmart`

A command that expands each selection from their end to include either all of the subsequent text, with any trailing whitespace trimmed, or simply all of the subsequent whitespace on their line(s) within the editor, with the former having higher precedence. It then copies that newly selected text into the clipboard.

### Cut Line

#### Cut Line All

>Identifier: `glencfl.cutLineAll`

A command that expands each selection to include the entire contents of their line(s) within the editor. It then copies that newly selected text into the clipboard and deletes it from the editor.

#### Cut Line Text

>Identifier: `glencfl.cutLineText`

A command that expands each selection to include all preceding and subsequent text, with any leading whitespace trimmed, on their line(s) within the editor. It then copies that newly selected text into the clipboard and deletes it from the editor.

#### Cut Line Smart

>Identifier: `glencfl.cutLineSmart`

A command that expands each selection to include either all preceding and subsequent text, with any leading whitespace trimmed, or simply the preceding and subsequent whitespace on their line(s) within the editor. It then copies that newly selected text into the clipboard and deletes it from the editor.

---
