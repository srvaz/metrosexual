import * as vscode from 'vscode';
import { isDayPreiod } from './timer.util';

export enum UI_THEME {
    LIGHT = 'vs',
    DARK = 'vs-dark'
}

enum THEME_TYPE {
    LIGHT = 'lightTheme',
    DARK = 'darkTheme'
}

interface Theme {
    id?: string;
    label: string;
    path: string;
    uiTheme: string;
}

const getWorkspaceConfig = (): vscode.WorkspaceConfiguration => vscode.workspace.getConfiguration();

const setTheme = (themeName: string | undefined, themeType: THEME_TYPE) => {
    if (!themeName) {
        return false;
    }

    getWorkspaceConfig().update(`metrosexual.${themeType}`, themeName);
};

const filterThemes = (themeType: UI_THEME): string[] => {
    const filteredThemes =  getAllThemes()
    .filter((theme: Theme) => theme.uiTheme === themeType);

    return normalizeThemeList(filteredThemes);
};

const getAllThemes = () => {
    const themes = vscode.extensions.all.filter(ext =>
        ext.packageJSON.contributes
        && ext.packageJSON.contributes.themes);

    return themes.map(theme => theme.packageJSON.contributes.themes).flat();
};

const normalizeThemeList = (themes: Theme[]): string[] =>
    themes.map(theme => theme.label);

export const pickThemes = (uiTheme: UI_THEME, placeHolder: string): void => {
    const themeType = uiTheme === UI_THEME.LIGHT
        ? THEME_TYPE.LIGHT
        : THEME_TYPE.DARK;

    vscode.window.showQuickPick(
        [...filterThemes(uiTheme)],
        { placeHolder }
    ).then(val => {
        setTheme(val, themeType);
        vscode.window.showInformationMessage('Theme is defined!');
    });
};

const changeWorkspaceTheme = (themeName: string): Thenable<void> =>
    getWorkspaceConfig().update('workbench.colorTheme', themeName);

const getMetrosexualTheme = (themeType: THEME_TYPE): string =>
    getWorkspaceConfig().get(`metrosexual.${themeType}`) || '';

export const chooseTheme = (): void => {
    const themeType = isDayPreiod() ? THEME_TYPE.LIGHT : THEME_TYPE.DARK;
    const themeToSet: string = getMetrosexualTheme(themeType);

    changeWorkspaceTheme(themeToSet);
};
