// mapped properties for keys in package.json vs keys in vscode
const PKG_PROP_MAP = {
  "sakai-icons.hidesExplorerArrows": "hidesExplorerArrows",
  "sakai-icons.folders.associations": "folders.associations",
  "sakai-icons.files.associations": "files.associations"
};

const MESSAGES = {
  needsReloadToSync: "A Reload is needed to sync with the updated settings",
  reloadButton: "Reload",
};

module.exports = {
  PKG_PROP_MAP,
  MESSAGES,
};
