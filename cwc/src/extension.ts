import * as vscode from 'vscode';
import * as path from 'path';

async function findFunctionCalls(text: string, document: vscode.TextDocument, startPosition: vscode.Position): Promise<{ text: string, uri: string }[]> {
    const lines = text.split('\n');
    const functionDefinitions: { text: string, uri: string }[] = [];
    const processedDefinitions = new Set<string>(); // To track processed function URIs

    for (const [lineIndex, line] of lines.entries()) {
        const functionCallMatch = line.match(/(\b\w+\b)\(/);
        if (functionCallMatch) {
            const functionName = functionCallMatch[1];
            const position = new vscode.Position(startPosition.line + lineIndex, line.indexOf(functionName));
            const definition = await findDefinition(document, position);

            if (definition && definition.uri) {
                // Convert URI to string and use as a unique identifier
                const definitionIdentifier = definition.uri.toString();
                // Check if this function's definition has already been processed
                if (!processedDefinitions.has(definitionIdentifier)) {
                    processedDefinitions.add(definitionIdentifier);
                    functionDefinitions.push({ text: definition.text, uri: definitionIdentifier });
                }
            }
        }
    }

    return functionDefinitions;
}


async function findDefinition(document: vscode.TextDocument, position: vscode.Position): Promise<{ text: string, uri: vscode.Uri } | null> {
    const results = await vscode.commands.executeCommand<Array<vscode.Location | vscode.LocationLink>>(
        'vscode.executeDefinitionProvider', 
        document.uri, 
        position
    );

    if (!results || results.length === 0) {
        return null;
    }

    // Handle both Location and LocationLink objects
    const firstResult = results[0];
    let uri: vscode.Uri;
    let range: vscode.Range;

    if ('uri' in firstResult) { // Handling Location object
        uri = firstResult.uri;
        range = firstResult.range;
    } else if ('targetUri' in firstResult) { // Handling LocationLink object
        uri = firstResult.targetUri;
        range = firstResult.targetRange;
    } else {
        return null; // Unexpected result type
    }

    const definitionDoc = await vscode.workspace.openTextDocument(uri);
    const definitionText = definitionDoc.getText(range);

    return { text: definitionText, uri };
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.copyWithExtendedContext', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const selection = editor.selection;
        const document = editor.document;
        const selectedText = document.getText(selection);
        const functionCalls = await findFunctionCalls(selectedText, document, selection.start);

        let combinedText = ""; // Initialize combinedText

        // Combine the selected text with function definitions and their relative pathnames
        functionCalls.forEach(({ text, uri }) => {
            if (!selectedText.includes(text)) { // Check if the definition text is not part of the original selection
                const workspaceFolders = vscode.workspace.workspaceFolders;
                const workspacePath = workspaceFolders ? workspaceFolders[0].uri.fsPath : '';
                const relativePath = path.relative(workspacePath, vscode.Uri.parse(uri).fsPath);
                combinedText += `\n// ${relativePath}\n${text}`; // Adjust format here
            }
        });

        // Prepend the selected text to the beginning of combinedText
        combinedText = selectedText + combinedText;

        await vscode.env.clipboard.writeText(combinedText);

        // Extract the first part of the combinedText to show in the information message
        const previewLength = 100; // Define a suitable length for the preview
        const messagePreview = combinedText.substring(0, previewLength) + (combinedText.length > previewLength ? "..." : ""); // Add ellipsis if text is cut
        vscode.window.showInformationMessage(`Copied with extended context: ${messagePreview}`);
    });

    context.subscriptions.push(disposable);
}



export function deactivate() {}