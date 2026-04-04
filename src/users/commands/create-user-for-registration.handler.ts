import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserForRegistrationCommand } from './create-user-for-registration.command';
import { UsersRepository } from '../users.repository';
import type { UserDocument } from '../../schemas/user.schema';

@CommandHandler(CreateUserForRegistrationCommand)
export class CreateUserForRegistrationHandler
  implements ICommandHandler<CreateUserForRegistrationCommand>
{
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: CreateUserForRegistrationCommand): Promise<UserDocument> {
    return this.usersRepository.createForRegistration(
      command.login,
      command.email,
      command.password,
      command.confirmationCode,
      command.expirationDate,
    );
  }
}
