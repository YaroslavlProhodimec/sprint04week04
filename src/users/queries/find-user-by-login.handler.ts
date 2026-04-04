import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserByLoginQuery } from './find-user-by-login.query';
import { UsersRepository } from '../users.repository';
import type { UserDocument } from '../../schemas/user.schema';

@QueryHandler(FindUserByLoginQuery)
export class FindUserByLoginHandler implements IQueryHandler<FindUserByLoginQuery> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(query: FindUserByLoginQuery): Promise<UserDocument | null> {
    return this.usersRepository.findByLogin(query.login);
  }
}
