import { UserRepository } from '../repositories/user.repository';
import { CreateUserInput, User } from '../validators/user.validator';
import { AppError } from '../../../core/errors';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async registerUser(data: CreateUserInput): Promise<User> {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) {
      throw new AppError('User with this email already exists', 409, 'USER_EXISTS');
    }

    return this.userRepository.create(data);
  }

  async getUserProfile(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }
    return user;
  }
}
