import { Queue, Worker, Job } from 'bullmq';
import Redis from 'ioredis';
import { EventBus } from '../../../../../../../core/src/hooks/event-bus';

export class QueueService {
  private redis: Redis;
  private queue: Queue;
  private worker: Worker;

  constructor(private eventBus: EventBus) {
    this.redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
    
    // Define the default queue for background tasks
    this.queue = new Queue('default-queue', { connection: this.redis as any });

    // Initialize the background worker
    this.worker = new Worker('default-queue', async (job: Job) => {
      console.log(`Processing job ${job.id} of type ${job.name} with data`, job.data);
      
      // If the job type is an event bridge trigger
      if (job.name === 'trigger_event') {
        this.eventBus.dispatch(job.data.eventName, job.data.payload);
      }
      
      // Add more specific job processors here as needed
    }, { connection: this.redis as any });

    this.worker.on('completed', (job: Job) => {
      console.log(`Job ${job.id} has completed successfully.`);
    });

    this.worker.on('failed', (job: Job | undefined, err: Error) => {
      console.log(`Job ${job?.id} has failed with error: ${err.message}`);
    });
  }

  /**
   * Enqueue a job to be processed in the background
   */
  async addJob(name: string, data: any, opts?: any) {
    try {
      return await this.queue.add(name, data, opts);
    } catch (error: any) {
      console.error(`[QueueService] Failed to add job ${name}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Gracefully close connections
   */
  async close() {
    try {
      await this.worker.close();
      await this.queue.close();
      await this.redis.quit();
    } catch (error: any) {
      console.error(`[QueueService] Failed to close connections: ${error.message}`);
    }
  }
}
