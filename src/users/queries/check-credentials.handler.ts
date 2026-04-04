import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CheckCredentialsQuery } from './check-credentials.query';
import { UsersRepository } from '../users.repository';
import type { UserDocument } from '../../schemas/user.schema';
import * as bcrypt from 'bcrypt';

@QueryHandler(CheckCredentialsQuery)
export class CheckCredentialsHandler implements IQueryHandler<CheckCredentialsQuery> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(query: CheckCredentialsQuery): Promise<UserDocument | null> {
    const user =
      (await this.usersRepository.findByLogin(query.loginOrEmail)) ??
      (await this.usersRepository.findByEmail(query.loginOrEmail));
    if (!user) return null;

    const isValid = await bcrypt.compare(query.password, user.accountData.passwordHash);
    if (!isValid) return null;

    const isConfirmed = user.emailConfirmation?.isConfirmed ?? user.isConfirmed ?? false;
    if (!isConfirmed) return null;

    return user;
  }
}
