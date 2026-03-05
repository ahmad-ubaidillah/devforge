import { describe, it, expect, vi } from 'vitest';
import { eventBus } from '../../../packages/core/src/hooks/event-bus';
import { CMSService } from '../../../packages/plugins/cms/files/src/modules/cms/services/cms.service';

describe('Task 16: Plugin Hooks & EventBus Smoke Test', () => {
  it('should dispatch and listen to events', () => {
    const callback = vi.fn();
    eventBus.subscribe('test.event', callback);
    
    eventBus.dispatch('test.event', { foo: 'bar' });
    
    expect(callback).toHaveBeenCalledWith({ foo: 'bar' });
  });

  it('should trigger events from CMSService', async () => {
    const mockDb = {
      insert: vi.fn().mockReturnThis(),
      values: vi.fn().mockReturnThis(),
      returning: vi.fn().mockResolvedValue([{ id: 'post_1', title: 'Hook Test' }]),
    };

    const cmsService = new CMSService(mockDb);
    const callback = vi.fn();
    
    eventBus.subscribe('cms.post.created', callback);
    
    await cmsService.createPost({ title: 'Hook Test' }, 'org_123');
    
    expect(callback).toHaveBeenCalled();
    const eventPayload = callback.mock.calls[0][0];
    expect(eventPayload.post.id).toBe('post_1');
    expect(eventPayload.organizationId).toBe('org_123');
  });
});
