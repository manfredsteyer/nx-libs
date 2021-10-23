import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, addProjectConfiguration } from '@nrwl/devkit';

import generator from './generator';

describe('example generator', () => {
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

    // Act
    await generator(appTree, { name: 'example', project: 'test-project' });

    // Assert
    const fileName = 'apps/test-project/src/app/example/example.component.ts';
    const exists = appTree.exists(fileName)
    expect(exists).toBe(true);

    const content = appTree.read('apps/test-project/src/app/example/example.component.ts', 'utf-8');
    expect(content).toContain(`selector: 'example'`);
    expect(content).toContain(`templateUrl: './example.component.html'`);
    expect(content).toContain(`export class ExampleComponent`);

  })
});
