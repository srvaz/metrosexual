import * as vscode from 'vscode';
import { setTheme, filterThemes, THEME_TYPE, UI_THEME } from './utils/theme.util';
import { isDayPreiod } from './utils/timer.util';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "metrosexual" is now active!');

	const config = vscode.workspace.getConfiguration();
	let themeType = isDayPreiod() ? THEME_TYPE.LIGHT : THEME_TYPE.DARK;
	let themeToSet = config.get(`metrosexual.${themeType}`);

	config.update('workbench.colorTheme', themeToSet);

	setInterval(() => {
		themeToSet = config.get(`metrosexual.${themeType}`);
		config.update('workbench.colorTheme', themeToSet);
	}, 60000);

	let setLightTheme = vscode.commands.registerCommand('extension.metrosexualLightTheme', () => {
		// Display a message box to the user
		vscode.window.showInformationMessage('Light theme is defined!');

		vscode.window.showQuickPick(
			[...filterThemes(UI_THEME.LIGHT)],
			{ placeHolder: 'Informe o tema light' }
		).then(val => setTheme(val, THEME_TYPE.LIGHT));
	});

	let setDarkTheme = vscode.commands.registerCommand('extension.metrosexualDarkTheme', () => {
		// Display a message box to the user
		vscode.window.showInformationMessage('Dark theme is defined!');

		vscode.window.showQuickPick(
			[...filterThemes(UI_THEME.DARK)],
			{ placeHolder: 'Informe o tema light' }
		).then(val => setTheme(val, THEME_TYPE.DARK));
	});

	context.subscriptions.push(setLightTheme, setDarkTheme);
}

export function deactivate() {}
