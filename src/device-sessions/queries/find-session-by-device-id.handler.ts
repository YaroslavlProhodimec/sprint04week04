import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindSessionByDeviceIdQuery } from './find-session-by-device-id.query';
import { DeviceSessionsRepository } from '../device-sessions.repository';
import type { DeviceSessionDocument } from '../../schemas/deviceSession.schema';

@QueryHandler(FindSessionByDeviceIdQuery)
export class FindSessionByDeviceIdHandler implements IQueryHandler<FindSessionByDeviceIdQuery> {
  constructor(private readonly sessionsRepo: DeviceSessionsRepository) {}

  async execute(query: FindSessionByDeviceIdQuery): Promise<DeviceSessionDocument | null> {
    return this.sessionsRepo.findByDeviceId(query.deviceId);
  }
}
