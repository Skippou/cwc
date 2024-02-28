# Copy with Context Extension for VS Code

This Visual Studio Code extension enhances your productivity by allowing you to copy a block of code with its related context, such as function definitions one level deep, directly to your clipboard. This is particularly useful for developers who frequently need to share or review code snippets with full context or work on integrating pieces of code from one project into another.

## Features

- Copy Code with Context: Select a piece of code and copy it along with its related function definitions to the clipboard.
- Relative Path Information: Includes comments with relative paths for each function definition, making it easier to locate the source file in your project.
- Avoids Duplicates: Ensures that function definitions are not duplicated in the copied text, even if they are referenced multiple times within the selection.

## How to Use

1. Select Code: Highlight the block of code you wish to copy in your editor.
2. Execute Command: Open the Command Palette (Ctrl+Shift+P on Windows/Linux, Cmd+Shift+P on macOS) and type Copy with Extended Context. Hit Enter to execute.
3. Paste Anywhere: Paste the copied code along with its context into any document or editor.

## Installation

Install this extension directly from the Visual Studio Code Marketplace:

1. Open Visual Studio Code.
2. Navigate to the Extensions view by clicking on the square icon on the sidebar or pressing Ctrl+Shift+X.
3. Search for "Copy with Extended Context".
   Click on the Install button.

Alternatively, you can install it via the Command Palette:

1. Open the Command Palette (Ctrl+Shift+P or Cmd+Shift+P).
1. Type ext install followed by the extension name, for example: ext install my-publisher.copy-with-extended-context.
   Requirements
   No specific requirements. This extension should work with any standard Visual Studio Code installation.

## Known Issues

- Currently in beta; unexpected behavior may occur for complex code structures or deeply nested function calls.
  Contributing
  Feedback and contributions are welcome. Please feel free to submit issues or pull requests to the [GitHub repository](https://github.com/Skippou/cwc).

## License

This extension is licensed under the Apache 2.0 License.

## Release Notes

0.0.1
Initial beta release.
Copy code selections with context.
Include relative path comments for external definitions.
