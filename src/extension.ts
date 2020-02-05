// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { setTheme, filterThemes, THEME_TYPE, UI_THEME } from './utils/theme.util';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "metrosexual" is now active!');

	let setLightTheme = vscode.commands.registerCommand('extension.metrosexualLightTheme', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Light theme is defined!');

		// const config = vscode.workspace.getConfiguration();

		// const lightTheme = vscode.workspace.getConfiguration('metrosexual').get<string>('lightTheme');

		vscode.window.showQuickPick(
			[...filterThemes(UI_THEME.LIGHT)],
			{ placeHolder: 'Informe o tema light' }
		).then(val => setTheme(val, THEME_TYPE.LIGHT));
	});

	let setDarkTheme = vscode.commands.registerCommand('extension.metrosexualDarkTheme', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Dark theme is defined!');

		// const config = vscode.workspace.getConfiguration();

		// const lightTheme = vscode.workspace.getConfiguration('metrosexual').get<string>('lightTheme');

		vscode.window.showQuickPick(
			[...filterThemes(UI_THEME.DARK)],
			{ placeHolder: 'Informe o tema light' }
		).then(val => setTheme(val, THEME_TYPE.DARK));
	});

	context.subscriptions.push(setLightTheme, setDarkTheme);
}

// this method is called when your extension is deactivated
export function deactivate() {}
