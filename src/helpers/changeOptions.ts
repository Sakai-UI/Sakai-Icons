import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as merge from 'lodash.merge';
import * as bb from 'bluebird';

export const changeOptions = async (updatedConfigs?: any, updatedJSONConfig?: any) => {
  const jsonFiles = ['sakai-icons-expanded', 'sakai-icons']
    .map(name => path.join(__dirname, `../../../src/${name}.json`));

  jsonFiles.forEach(file => {
    bb.promisify(fs.readFile)(file)
      .then(data => JSON.parse(data.toString()))
      .then(json => {
        const options = merge({}, json, updatedJSONConfig, { options: updatedJSONConfig });
        return JSON.stringify(options, undefined, 2);
      }).then(jsonString => bb.promisify(fs.writeFile)(file, jsonString));
  });
};
