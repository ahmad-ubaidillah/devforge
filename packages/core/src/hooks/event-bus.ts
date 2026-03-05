import { EventEmitter } from 'events';

/**
 * EventBus
 * 
 * A central messaging hub that allows plugins to communicate asynchronously 
 * without direct coupling. 
 */
export class EventBus extends EventEmitter {
  private static instance: EventBus;

  private constructor() {
    super();
    // Increase limit for a large plugin ecosystem
    this.setMaxListeners(100);
  }

  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  /**
   * Type-safe emit wrapper
   */
  public dispatch(event: string, payload: any): boolean {
    console.log(`[EventBus] Dispatched: ${event}`, payload);
    return this.emit(event, payload);
  }

  /**
   * Type-safe subscribe wrapper
   */
  public subscribe(event: string, callback: (payload: any) => void): this {
    return this.on(event, callback);
  }
}

export const eventBus = EventBus.getInstance();
