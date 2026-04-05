import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteDeviceSessionCommand } from './delete-device-session.command';
import { DeviceSessionsRepository } from '../device-sessions.repository';

@CommandHandler(DeleteDeviceSessionCommand)
export class DeleteDeviceSessionHandler implements ICommandHandler<DeleteDeviceSessionCommand> {
  constructor(private readonly sessionsRepo: DeviceSessionsRepository) {}

  async execute(command: DeleteDeviceSessionCommand): Promise<boolean> {
    return this.sessionsRepo.deleteByDeviceId(command.deviceId);
  }
}
