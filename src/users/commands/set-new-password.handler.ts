import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SetNewPasswordCommand } from './set-new-password.command';
import { UsersRepository } from '../users.repository';

@CommandHandler(SetNewPasswordCommand)
export class SetNewPasswordHandler implements ICommandHandler<SetNewPasswordCommand> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: SetNewPasswordCommand): Promise<boolean> {
    return this.usersRepository.setNewPassword(command.userId, command.newPassword);
  }
}
