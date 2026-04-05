import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateDeviceSessionCommand } from './update-device-session.command';
import { DeviceSessionsRepository } from '../device-sessions.repository';

@CommandHandler(UpdateDeviceSessionCommand)
export class UpdateDeviceSessionHandler implements ICommandHandler<UpdateDeviceSessionCommand> {
  constructor(private readonly sessionsRepo: DeviceSessionsRepository) {}

  async execute(command: UpdateDeviceSessionCommand): Promise<boolean> {
    return this.sessionsRepo.updateSession(
      command.deviceId,
      command.issuedAt,
      command.expirationDate,
    );
  }
}
