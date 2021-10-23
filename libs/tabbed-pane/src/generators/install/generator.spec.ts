import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, addProjectConfiguration } from '@nrwl/devkit';

import { appModuleTemplate } from './app-module.tmpl';
import generator from './generator';
import { InstallGeneratorSchema } from './schema';

describe('install generator', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {

    // Arrange
    addProjectConfiguration(appTree, 'test-project', {
      root: 'apps/test-project',
      sourceRoot: 'apps/test-project/src'
    });

    appTree.write('apps/test-project/src/app/app.module.ts', appModuleTemplate);

    // Act
    await generator(appTree, { project: 'test-project' });

    // Assert
    const content = appTree.read('apps/test-project/src/app/app.module.ts', 'utf-8');
    expect(content).toContain('@my-project/tabbed-pane');
    expect(content).toContain('TabbedPaneModule');

  });
});
