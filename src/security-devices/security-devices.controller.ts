import {
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Request } from 'express';
import { RefreshTokenGuard } from '../auth/guards/refresh-token.guard';
import { FindAllSessionsByUserIdQuery } from '../device-sessions/queries';
import { FindSessionByDeviceIdQuery } from '../device-sessions/queries';
import { DeleteDeviceSessionCommand, DeleteAllSessionsExceptCurrentCommand } from '../device-sessions/commands';
import type { DeviceSessionDocument } from '../schemas/deviceSession.schema';

@Controller('security/devices')
@UseGuards(RefreshTokenGuard)
export class SecurityDevicesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAllDevices(@Req() req: Request) {
    const { userId } = (req as any).user;
    const sessions: DeviceSessionDocument[] = await this.queryBus.execute(
      new FindAllSessionsByUserIdQuery(userId),
    );

    return sessions.map((s) => ({
      ip: s.ip,
      title: s.deviceName,
      lastActiveDate: s.lastActiveDate.toISOString(),
      deviceId: s.deviceId,
    }));
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAllExceptCurrent(@Req() req: Request) {
    const { userId, deviceId } = (req as any).user;
    await this.commandBus.execute(
      new DeleteAllSessionsExceptCurrentCommand(userId, deviceId),
    );
  }

  @Delete(':deviceId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteDevice(@Param('deviceId') deviceId: string, @Req() req: Request) {
    const { userId } = (req as any).user;

    const session: DeviceSessionDocument | null = await this.queryBus.execute(
      new FindSessionByDeviceIdQuery(deviceId),
    );

    if (!session) {
      throw new NotFoundException('Device session not found');
    }

    if (session.userId !== userId) {
      throw new ForbiddenException('Not your device');
    }

    await this.commandBus.execute(new DeleteDeviceSessionCommand(deviceId));
  }
}
