import * as vscode from 'vscode';

export enum UI_THEME {
    LIGHT = 'vs',
    DARK = 'vs-dark'
}

export enum THEME_TYPE {
    LIGHT = 'lightTheme',
    DARK = 'darkTheme'
}

export interface Theme {
    id?: string;
    label: string;
    path: string;
    uiTheme: string;
}

export const setTheme = (themeName: string | undefined, themeType: THEME_TYPE) => {
    if (!themeName) {
        return false;
    }

    const config = vscode.workspace.getConfiguration();

    config.update(`metrosexual.${themeType}`, themeName);
};

export const filterThemes = (themeType: UI_THEME): string[] => {
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
