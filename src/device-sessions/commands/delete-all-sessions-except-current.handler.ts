import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAllSessionsExceptCurrentCommand } from './delete-all-sessions-except-current.command';
import { DeviceSessionsRepository } from '../device-sessions.repository';

@CommandHandler(DeleteAllSessionsExceptCurrentCommand)
export class DeleteAllSessionsExceptCurrentHandler
  implements ICommandHandler<DeleteAllSessionsExceptCurrentCommand>
{
  constructor(private readonly sessionsRepo: DeviceSessionsRepository) {}

  async execute(command: DeleteAllSessionsExceptCurrentCommand): Promise<void> {
    await this.sessionsRepo.deleteAllByUserIdExceptDeviceId(command.userId, command.deviceId);
  }
}
