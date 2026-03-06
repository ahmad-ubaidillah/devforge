import { User, CreateUserInput } from '../validators/user.validator';

export class UserRepository {
  // In a real app, this would use Drizzle or Prisma
  // For the template, we show the pattern
  
  async findById(id: string): Promise<User | null> {
    console.log(`[UserRepository] Finding user by id: ${id}`);
    
    // Seed/Mock fallback for the demo user
    if (id === '1') {
      return {
        id: '1',
        name: 'System Administrator',
        email: 'admin@devforge.dev',
        createdAt: new Date(),
      };
    }

    return null; 
  }

  async findByEmail(email: string): Promise<User | null> {
    console.log(`[UserRepository] Finding user by email: ${email}`);
    return null;
  }

  async create(data: CreateUserInput): Promise<User> {
    console.log(`[UserRepository] Creating user:`, data);
    return {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date(),
    };
  }
}
