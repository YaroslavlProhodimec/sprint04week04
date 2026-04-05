import { CreateDeviceSessionHandler } from './create-device-session.handler';
import { UpdateDeviceSessionHandler } from './update-device-session.handler';
import { DeleteDeviceSessionHandler } from './delete-device-session.handler';

export { CreateDeviceSessionCommand } from './create-device-session.command';
export { CreateDeviceSessionHandler };
export { UpdateDeviceSessionCommand } from './update-device-session.command';
export { UpdateDeviceSessionHandler };
export { DeleteDeviceSessionCommand } from './delete-device-session.command';
export { DeleteDeviceSessionHandler };

export const DeviceSessionCommandHandlers = [
  CreateDeviceSessionHandler,
  UpdateDeviceSessionHandler,
  DeleteDeviceSessionHandler,
];
