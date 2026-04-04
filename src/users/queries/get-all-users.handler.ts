import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllUsersQuery } from './get-all-users.query';
import { UsersRepository } from '../users.repository';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(query: GetAllUsersQuery) {
    return this.usersRepository.getAllUsers(query.sortData);
  }
}
