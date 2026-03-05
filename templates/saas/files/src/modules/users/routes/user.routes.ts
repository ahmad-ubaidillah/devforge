import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { createUserSchema } from '../validators/user.validator';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';

const userRoutes = new Hono();

// Dependency Injection (Pattern manual for template)
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

userRoutes.post('/register', zValidator('json', createUserSchema), async (c) => {
  const data = c.req.valid('json');
  const user = await userService.registerUser(data);
  
  return c.json({
    success: true,
    data: user
  }, 201);
});

userRoutes.get('/:id', async (c) => {
  const id = c.req.param('id');
  const user = await userService.getUserProfile(id);
  
  return c.json({
    success: true,
    data: user
  });
});

export { userRoutes };
