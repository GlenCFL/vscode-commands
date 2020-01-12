## GlenCFL's VSCode Commands

This extension includes several commands that I found to be missing from [Visual Studio Code](https://code.visualstudio.com/) by default.

### Copy All Right and Cut All Right

Both of these commands will take each of your active selections and expand those selections to the end of each selection's respective line. The `copyAllRight` command would then simply copy that text into your clipboard, whereas the `cutAllRight` command would cut that text into your clipboard.

A few notes on the design of both commands:
- Both positional selections and text-highlighting selections were taken into account, with the new selection for the latter spanning from the start of that highlighted text to the end of the line.
- Multiple selections that fall onto the same line are merged together.
- Any text that has been word wrapped is also selected whenever either command is executed.
