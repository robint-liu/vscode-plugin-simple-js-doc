import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "inject-tags" is now active!');

	const disposable = vscode.commands.registerCommand('inject-tags', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}
		editor.edit(editBuilder => {
			const curPosition = editor.selection.active;
			const curLine = editor.document.lineAt(curPosition.line);
			const indent = curLine.text.substring(0, curLine.firstNonWhitespaceCharacterIndex);
			const tagsStr = `${indent}/**  */\n`;
			const insertPosition = new vscode.Position(curPosition.line, 0);
			editBuilder.insert(insertPosition, tagsStr);
			setTimeout(() => {
				const newPosition = new vscode.Position(curPosition.line, indent.length + 4);
				editor.selection = new vscode.Selection(newPosition, newPosition);
			}, 50);
		})
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }