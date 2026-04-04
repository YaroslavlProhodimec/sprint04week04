import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserByConfirmationCodeQuery } from './find-user-by-confirmation-code.query';
import { UsersRepository } from '../users.repository';
import type { UserDocument } from '../../schemas/user.schema';

@QueryHandler(FindUserByConfirmationCodeQuery)
export class FindUserByConfirmationCodeHandler
  implements IQueryHandler<FindUserByConfirmationCodeQuery>
{
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(query: FindUserByConfirmationCodeQuery): Promise<UserDocument | null> {
    return this.usersRepository.findByConfirmationCode(query.code);
  }
}
