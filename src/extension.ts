import * as vscode from 'vscode';
import { UI_THEME, chooseTheme, pickThemes } from './utils/theme.util';

export function activate(context: vscode.ExtensionContext) {
	chooseTheme();

	setInterval(() => chooseTheme(), 60000);

	let setLightTheme = vscode.commands.registerCommand('extension.metrosexualLightTheme', () => {
		pickThemes(UI_THEME.LIGHT, 'Pick your light theme');
		chooseTheme();
	});

	let setDarkTheme = vscode.commands.registerCommand('extension.metrosexualDarkTheme', () => {
		pickThemes(UI_THEME.DARK, 'Pick your dark theme');
		chooseTheme();
	});

	context.subscriptions.push(setLightTheme, setDarkTheme);
}

export function deactivate() {}
