import {
  Controller,
  Get,
  Post,
  Delete,
  Query,
  Param,
  Body,
  HttpStatus,
  HttpCode,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BasicAuthGuard } from '../auth/guards/basic-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserCommand } from './commands';
import { DeleteUserCommand } from './commands';
import { GetAllUsersQuery } from './queries';

@Controller('users')
@UseGuards(BasicAuthGuard)
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getUsers(@Query() query: any) {
    const sortData = {
      searchNameTerm: query.searchNameTerm,
      searchEmailTerm: query.searchEmailTerm,
      searchLoginTerm: query.searchLoginTerm,
      loginOrEmail: query.loginOrEmail,
      sortBy: query.sortBy,
      sortDirection: query.sortDirection,
      pageNumber: query.pageNumber,
      pageSize: query.pageSize,
    };

    return this.queryBus.execute(new GetAllUsersQuery(sortData));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() dto: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(dto.login, dto.email, dto.password));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string): Promise<void> {
    const deleted = await this.commandBus.execute(new DeleteUserCommand(id));
    if (!deleted) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
