import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "inject-tags" is now active!');

	const disposable = vscode.commands.registerCommand('inject-tags', () => {
		const editor = vscode.window.activeTextEditor;
		editor?.edit(editBuilder => {
			const line = editor.selection.active.line;
			const position = editor.selection.active;
			const tagsStr = '/**\n' + ' * \n' + ' */\n';
			editBuilder.insert(new vscode.Position(line, 0), tagsStr);
			setTimeout(() => {
				const newPosition = position.with(line + 1, 3);
				editor.selection = new vscode.Selection(newPosition, newPosition);
			}, 80);
		})
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }