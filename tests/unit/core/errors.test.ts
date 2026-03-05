import { describe, it, expect, vi } from 'vitest';
import { DevForgeError, handleError } from '../../../packages/core/src/core/errors';

describe('Error Handling', () => {
  it('should format DevForgeError correctly', () => {
    const err = new DevForgeError('Fail', 'FAIL_CODE', { x: 1 });
    expect(err.message).toBe('Fail');
    expect(err.code).toBe('FAIL_CODE');
    expect(err.details.x).toBe(1);
  });

  it('should handle native errors correctly', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    handleError(new Error('Native'));
    expect(spy).toHaveBeenCalledWith('[Unexpected Error]:', expect.any(Error));
    spy.mockRestore();
  });

  it('should handle DevForgeError correctly in global handler', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const err = new DevForgeError('Special', 'CORE_ERR');
    handleError(err);
    expect(spy).toHaveBeenCalledWith('[CORE_ERR]: Special');
    spy.mockRestore();
  });
});
