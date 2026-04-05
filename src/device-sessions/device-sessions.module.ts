import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceSession, DeviceSessionSchema } from '../schemas/deviceSession.schema';
import { DeviceSessionsRepository } from './device-sessions.repository';
import { DeviceSessionCommandHandlers } from './commands';
import { DeviceSessionQueryHandlers } from './queries';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: DeviceSession.name, schema: DeviceSessionSchema },
    ]),
  ],
  providers: [
    DeviceSessionsRepository,
    ...DeviceSessionCommandHandlers,
    ...DeviceSessionQueryHandlers,
  ],
  exports: [DeviceSessionsRepository, CqrsModule],
})
export class DeviceSessionsModule {}
