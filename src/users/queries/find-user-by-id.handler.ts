import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserByIdQuery } from './find-user-by-id.query';
import { UsersRepository } from '../users.repository';
import type { UserDocument } from '../../schemas/user.schema';

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdHandler implements IQueryHandler<FindUserByIdQuery> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(query: FindUserByIdQuery): Promise<UserDocument | null> {
    return this.usersRepository.findById(query.userId);
  }
}
