import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateDeviceSessionCommand } from './create-device-session.command';
import { DeviceSessionsRepository } from '../device-sessions.repository';

@CommandHandler(CreateDeviceSessionCommand)
export class CreateDeviceSessionHandler implements ICommandHandler<CreateDeviceSessionCommand> {
  constructor(private readonly sessionsRepo: DeviceSessionsRepository) {}

  async execute(command: CreateDeviceSessionCommand) {
    return this.sessionsRepo.createSession(
      command.userId,
      command.deviceId,
      command.issuedAt,
      command.expirationDate,
    );
  }
}
