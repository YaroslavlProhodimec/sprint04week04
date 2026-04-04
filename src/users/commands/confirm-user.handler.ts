import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConfirmUserCommand } from './confirm-user.command';
import { UsersRepository } from '../users.repository';
import type { UserDocument } from '../../schemas/user.schema';

@CommandHandler(ConfirmUserCommand)
export class ConfirmUserHandler implements ICommandHandler<ConfirmUserCommand> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: ConfirmUserCommand): Promise<UserDocument | null> {
    return this.usersRepository.confirmUser(command.userId);
  }
}
