import * as semver from 'semver';
import * as vscode from 'vscode';
import * as helpers from './index';

export enum ThemeStatus {
    neverUsedBefore,
    updated,
    current
}

/** Check the current status of the theme */
export const checkThemeStatus = async (state: vscode.Memento) => {
    try {
        // get the version from the state
        const stateVersion = await state.get('sakai-icons.version');
        const packageVersion = getCurrentExtensionVersion();

        // check if the theme was used before
        if (stateVersion === undefined) {
            await updateExtensionVersionInMemento(state);
            return themeIsAlreadyActivated() ? ThemeStatus.updated : ThemeStatus.neverUsedBefore;
        }
        // compare the version in the state with the package version
        else if (semver.lt(stateVersion, packageVersion)) {
            await updateExtensionVersionInMemento(state);
            return ThemeStatus.updated;
        }
        else {
            return ThemeStatus.current;
        }
    }
    catch (err) {
        console.log(err);
    }
};

/** Check if the theme was used before */
const themeIsAlreadyActivated = () => {
    return helpers.isThemeActivated() || helpers.isThemeActivated(true);
};

/** Update the version number to the current version in the memento. */
const updateExtensionVersionInMemento = async (state: vscode.Memento) => {
    return await state.update('sakai-icons.version', getCurrentExtensionVersion());
};

/** Get the current version of the extension */
const getCurrentExtensionVersion = (): string => {
    return vscode.extensions.getExtension('Sakai.sakai-icons').packageJSON.version;
};
