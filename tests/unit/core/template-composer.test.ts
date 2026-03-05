import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { composeTemplate } from '../../../packages/core/src/engine/template-composer';
import fs from 'fs-extra';
import path from 'path';

describe('template-composer', () => {
  const testDir = path.join(process.cwd(), 'tmp-composer-test');
  const templatePath = path.join(testDir, 'template');
  const filesDir = path.join(templatePath, 'files');
  const targetDir = path.join(testDir, 'target');

  beforeEach(() => {
    if (fs.existsSync(testDir)) fs.rmSync(testDir, { recursive: true, force: true });
    fs.mkdirSync(testDir, { recursive: true });
    fs.mkdirSync(templatePath, { recursive: true });
    fs.mkdirSync(filesDir, { recursive: true });
    fs.mkdirSync(targetDir, { recursive: true });

    // Mark template file with variable
    fs.writeFileSync(path.join(filesDir, 'README.md'), 'Name: {{PROJECT_NAME}}');
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) fs.rmSync(testDir, { recursive: true, force: true });
  });

  it('should copy files and replace variables', () => {
    // Signature: templatePath, targetDir, { projectName, plugins }
    composeTemplate(templatePath, targetDir, { projectName: 'MyTestApp', plugins: [] });

    const targetFile = path.join(targetDir, 'README.md');
    expect(fs.existsSync(targetFile)).toBe(true);
    
    const content = fs.readFileSync(targetFile, 'utf8');
    expect(content).toBe('Name: MyTestApp');
  });

  it('should handle missing variables by replacing with undefined string (current behavior)', () => {
    // We pass an object with undefined projectName to verify current behavior
    composeTemplate(templatePath, targetDir, {} as any);

    const content = fs.readFileSync(path.join(targetDir, 'README.md'), 'utf8');
    expect(content).toBe('Name: undefined');
  });
});
