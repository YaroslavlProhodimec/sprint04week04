import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserByRecoveryCodeQuery } from './find-user-by-recovery-code.query';
import { UsersRepository } from '../users.repository';
import type { UserDocument } from '../../schemas/user.schema';

@QueryHandler(FindUserByRecoveryCodeQuery)
export class FindUserByRecoveryCodeHandler
  implements IQueryHandler<FindUserByRecoveryCodeQuery>
{
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(query: FindUserByRecoveryCodeQuery): Promise<UserDocument | null> {
    return this.usersRepository.findByRecoveryCode(query.recoveryCode);
  }
}
