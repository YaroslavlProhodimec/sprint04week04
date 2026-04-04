import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SetRecoveryCodeCommand } from './set-recovery-code.command';
import { UsersRepository } from '../users.repository';

@CommandHandler(SetRecoveryCodeCommand)
export class SetRecoveryCodeHandler implements ICommandHandler<SetRecoveryCodeCommand> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: SetRecoveryCodeCommand): Promise<boolean> {
    return this.usersRepository.setRecoveryCode(
      command.userId,
      command.recoveryCode,
      command.expirationDate,
    );
  }
}
