import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllSessionsByUserIdQuery } from './find-all-sessions-by-user-id.query';
import { DeviceSessionsRepository } from '../device-sessions.repository';
import type { DeviceSessionDocument } from '../../schemas/deviceSession.schema';

@QueryHandler(FindAllSessionsByUserIdQuery)
export class FindAllSessionsByUserIdHandler implements IQueryHandler<FindAllSessionsByUserIdQuery> {
  constructor(private readonly sessionsRepo: DeviceSessionsRepository) {}

  async execute(query: FindAllSessionsByUserIdQuery): Promise<DeviceSessionDocument[]> {
    return this.sessionsRepo.findAllByUserId(query.userId);
  }
}
