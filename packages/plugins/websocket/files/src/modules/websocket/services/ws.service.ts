import { EventBus } from '../../../../../../../core/src/hooks/event-bus';

export class WebSocketService {
  private clients: Set<any>;

  constructor(private eventBus: EventBus) {
    this.clients = new Set();

    // Listen to all public events that should trigger a frontend notification
    this.eventBus.on('notification.broadcast', (payload: any) => {
      this.broadcast(payload);
    });
    
    // Listen to tenant-specific events
    this.eventBus.on('tenant.event', (payload: any) => {
      // Logic to filter clients by orgId can be implemented here
      this.broadcast(payload);
    });
  }

  /**
   * Registers a connected socket
   */
  addClient(ws: any) {
    this.clients.add(ws);
  }

  /**
   * Unregisters a disconnected socket
   */
  removeClient(ws: any) {
    this.clients.delete(ws);
  }

  /**
   * Broadcasts a message to all connected clients
   */
  broadcast(message: any) {
    const data = JSON.stringify(message);
    for (const client of this.clients) {
      // Verify the connection is still open before sending
      if (typeof client.send === 'function') {
        try {
          client.send(data);
        } catch (err) {
          console.error('Failed to send message to client', err);
        }
      }
    }
  }
}
