import {
  formatFiles,
  Tree,
  readProjectConfiguration,
  joinPathFragments,
  convertNxGenerator,
  readWorkspaceConfiguration
} from '@nrwl/devkit';

import { insertImport } from '@nrwl/workspace/src/utilities/ast-utils';
import { addImportToModule  } from '@nrwl/angular/src/utils/nx-devkit/ast-utils';

import * as ts from 'typescript';
import { InstallGeneratorSchema } from './schema';

export default async function generate(host: Tree, options: InstallGeneratorSchema) {

  if (!options.project) {
    const workspace = readWorkspaceConfiguration(host);
    if (!workspace.defaultProject) throw new Error(`no default project specified!`);
    options.project = workspace.defaultProject;
  }

  const config = readProjectConfiguration(host, options.project);

  if (!config.sourceRoot) throw Error(`sourceRoot expected in config for project ${options.project}`);

  const filePath = joinPathFragments(config.sourceRoot, 'app/app.module.ts');
  
  const content = host.read(filePath, 'utf-8');

  if (!content) throw Error(`no content in app.module.ts`);

  let sourceFile = ts.createSourceFile(
    'app.module.ts', 
    content, 
    ts.ScriptTarget.Latest, true);

  sourceFile =  insertImport(
    host, 
    sourceFile, 
    filePath, 
    'TabbedPaneModule', 
    '@my-project/tabbed-pane');
  
  addImportToModule(
    host, 
    sourceFile, 
    filePath, 
    'TabbedPaneModule');

  formatFiles(host);
}

export const schematic = convertNxGenerator(generate);