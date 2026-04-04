import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserByEmailQuery } from './find-user-by-email.query';
import { UsersRepository } from '../users.repository';
import type { UserDocument } from '../../schemas/user.schema';

@QueryHandler(FindUserByEmailQuery)
export class FindUserByEmailHandler implements IQueryHandler<FindUserByEmailQuery> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(query: FindUserByEmailQuery): Promise<UserDocument | null> {
    return this.usersRepository.findByEmail(query.email);
  }
}
