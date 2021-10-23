import {
  formatFiles,
  Tree,
  generateFiles,
  readWorkspaceConfiguration,
  readProjectConfiguration,
  joinPathFragments,
  convertNxGenerator
} from '@nrwl/devkit';
import { ExampleGeneratorSchema } from './schema';
import { names } from '@nrwl/devkit';

export default async function generate(host: Tree, options: ExampleGeneratorSchema) {

  if (!options.project) {
    const workspace = readWorkspaceConfiguration(host);
    if (!workspace.defaultProject) throw new Error(`no default project specified!`);
    options.project = workspace.defaultProject;
  }

  const config = readProjectConfiguration(host, options.project);

  if (!config.sourceRoot) throw Error(`sourceRoot expected in config for project ${options.project}`);

  const name = names(options.name).fileName;
  const className = names(options.name).className;
  const targetFolder = joinPathFragments(config.sourceRoot, 'app'); 
  const templatesFolder = joinPathFragments(__dirname, 'files');

  generateFiles(
    host, 
    templatesFolder, 
    targetFolder,
    {name, className});

  formatFiles(host);

}

export const schematic = convertNxGenerator(generate);
