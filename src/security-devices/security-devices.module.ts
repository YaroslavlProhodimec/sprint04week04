import { Module } from '@nestjs/common';
import { SecurityDevicesController } from './security-devices.controller';
import { DeviceSessionsModule } from '../device-sessions/device-sessions.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DeviceSessionsModule, AuthModule],
  controllers: [SecurityDevicesController],
})
export class SecurityDevicesModule {}
