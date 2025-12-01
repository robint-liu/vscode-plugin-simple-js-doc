import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "inject-tags" is now active!');

	const disposable = vscode.commands.registerCommand('inject-tags', () => {
		const editor = vscode.window.activeTextEditor;
		editor?.edit(editBuilder => {
			const curPosition = editor.selection.active;
			const tagsStr = '/**  */';
			editBuilder.insert(curPosition, tagsStr);
			setTimeout(() => {
				const newPosition = curPosition.translate(0, 4);
				editor.selection = new vscode.Selection(newPosition, newPosition);
			}, 50);
		})
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }