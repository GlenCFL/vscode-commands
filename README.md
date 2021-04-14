## Reselection Commands

This extension for [Visual Studio Code](https://code.visualstudio.com/) provides a series of commands that expand on your selections within the editor, with variants that will follow up those selection modifications with either the `Clipboard Copy` command or the `Clipboard Cut` command.

---

## Expand Left

### Expand Left All

>Identifier: `reselection.expandLeftAll`

A command that expands each selection from their start to include all preceding characters to the start of their line(s) within the editor.

### Expand Left Text

>Identifier: `reselection.expandLeftText`

A command that expands each selection from their start to include all preceding
text, with any leading whitespace trimmed, on their line(s) within the editor.
It then copies that newly selected text into the clipboard.

### Expand Left Smart

>Identifier: `reselection.expandLeftSmart`

A command that expands each selection from their start to include either all preceding text, with any leading whitespace trimmed, or simply the preceding whitespace on their line(s) within the editor, with the former having higher precedence.

## Expand Right

### Expand Right All

>Identifier: `reselection.expandRightAll`

A command that expands each selection from their end to include all of the subsequent characters to the end of their line(s) within the editor.

### Expand Right Text

>Identifier: `reselection.expandRightText`

A command that expands each selection from their end to include all of the subsequent text, with any trailing whitespace trimmed, on their line(s) within the editor.

### Expand Right Smart

>Identifier: `reselection.expandRightSmart`

A command that expands each selection from their end to include either all of the subsequent text, with any trailing whitespace trimmed, or simply all of the subsequent whitespace on their line(s) within the editor, with the former having higher precedence.

## Expand Line

### Expand Line All

>Identifier: `reselection.expandLineAll`

A command that expands each selection to include the entire contents of their line(s) within the editor.

### Expand Line Text

>Identifier: `reselection.expandLineText`

A command that expands each selection to include all preceding and subsequent text, with any leading whitespace trimmed, on their line(s) within the editor.

### Expand Line Smart

>Identifier: `reselection.expandLineSmart`

A command that expands each selection to include either all preceding and subsequent text, with any leading whitespace trimmed, or simply the preceding and subsequent whitespace on their line(s) within the editor.

## Copy Left

### Copy Left All

>Identifier: `reselection.copyLeftAll`

A command that expands each selection from their start to include all preceding characters to the start of their line(s) within the editor. It then copies that newly selected text into the clipboard.

### Copy Left Text

>Identifier: `reselection.copyLeftText`

A command that expands each selection from their start to include all preceding
text, with any leading whitespace trimmed, on their line(s) within the editor.
It then copies that newly selected text into the clipboard.

### Copy Left Smart

>Identifier: `reselection.copyLeftSmart`

A command that expands each selection from their start to include either all preceding text, with any leading whitespace trimmed, or simply the preceding whitespace on their line(s) within the editor, with the former having higher precedence. It then copies that newly selected text into the clipboard.

## Copy Right

### Copy Right All

>Identifier: `reselection.copyRightAll`

A command that expands each selection from their end to include all of the subsequent characters to the end of their line(s) within the editor. It then copies that newly selected text into the clipboard.

### Copy Right Text

>Identifier: `reselection.copyRightText`

A command that expands each selection from their end to include all of the subsequent text, with any trailing whitespace trimmed, on their line(s) within the editor. It then copies that newly selected text into the clipboard.

### Copy Right Smart

>Identifier: `reselection.copyRightSmart`

A command that expands each selection from their end to include either all of the subsequent text, with any trailing whitespace trimmed, or simply all of the subsequent whitespace on their line(s) within the editor, with the former having higher precedence. It then copies that newly selected text into the clipboard.

## Copy Line

### Copy Line All

>Identifier: `reselection.copyLineAll`

A command that expands each selection to include the entire contents of their line(s) within the editor. It then copies that newly selected text into the clipboard.

### Copy Line Text

>Identifier: `reselection.copyLineText`

A command that expands each selection to include all preceding and subsequent text, with any leading whitespace trimmed, on their line(s) within the editor. It then copies that newly selected text into the clipboard.

### Copy Line Smart

>Identifier: `reselection.copyLineSmart`

A command that expands each selection to include either all preceding and subsequent text, with any leading whitespace trimmed, or simply the preceding and subsequent whitespace on their line(s) within the editor. It then copies that newly selected text into the clipboard.

## Cut Left

### Cut Left All

>Identifier: `reselection.cutLeftAll`

A command that expands each selection from their start to include all preceding characters to the start of their line(s) within the editor. It then copies that newly selected text into the clipboard and deletes it from the editor.

### Cut Left Text

>Identifier: `reselection.cutLeftText`

A command that expands each selection from their start to include all preceding text, with any leading whitespace trimmed, on their line(s) within the editor. It then copies that newly selected text into the clipboard and deletes it from the editor.

### Cut Left Smart

>Identifier: `reselection.cutLeftSmart`

A command that expands each selection from their start to include either all preceding text, with any leading whitespace trimmed, or simply the preceding whitespace on their line(s) within the editor, with the former having higher precedence. It then copies that newly selected text into the clipboard and deletes it from the editor.

## Cut Right

### Cut Right All

>Identifier: `reselection.cutRightAll`

A command that expands each selection from their end to include all of the subsequent characters to the end of their line(s) within the editor. It then copies that newly selected text into the clipboard.

### Cut Right Text

>Identifier: `reselection.cutRightText`

A command that expands each selection from their end to include all of the subsequent text, with any trailing whitespace trimmed, on their line(s) within the editor. It then copies that newly selected text into the clipboard.

### Cut Right Smart

>Identifier: `reselection.cutRightSmart`

A command that expands each selection from their end to include either all of the subsequent text, with any trailing whitespace trimmed, or simply all of the subsequent whitespace on their line(s) within the editor, with the former having higher precedence. It then copies that newly selected text into the clipboard.

## Cut Line

### Cut Line All

>Identifier: `reselection.cutLineAll`

A command that expands each selection to include the entire contents of their line(s) within the editor. It then copies that newly selected text into the clipboard and deletes it from the editor.

### Cut Line Text

>Identifier: `reselection.cutLineText`

A command that expands each selection to include all preceding and subsequent text, with any leading whitespace trimmed, on their line(s) within the editor. It then copies that newly selected text into the clipboard and deletes it from the editor.

### Cut Line Smart

>Identifier: `reselection.cutLineSmart`

A command that expands each selection to include either all preceding and subsequent text, with any leading whitespace trimmed, or simply the preceding and subsequent whitespace on their line(s) within the editor. It then copies that newly selected text into the clipboard and deletes it from the editor.
