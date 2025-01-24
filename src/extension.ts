import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "inject-tags" is now active!');

	const disposable = vscode.commands.registerCommand('inject-tags', () => {
		const editor = vscode.window.activeTextEditor;
		editor?.edit(editBuilder => {
			const curPosition = editor.selection.active;
			const tagsStr = '/**  */\n';
			const insertPosition = new vscode.Position(curPosition.line, 0);
			editBuilder.insert(insertPosition, tagsStr);
			setTimeout(() => {
				const newPosition = insertPosition.with(curPosition.line, 4);
				editor.selection = new vscode.Selection(newPosition, newPosition);
			}, 50);
		})
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }