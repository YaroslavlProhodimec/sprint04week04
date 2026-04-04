import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { User, UserSchema } from '../schemas/user.schema';
import { CommandHandlers } from './commands';
import { QueryHandlers } from './queries';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersRepository, ...CommandHandlers, ...QueryHandlers],
  exports: [UsersRepository, CqrsModule],
})
export class UsersModule {}
