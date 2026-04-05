import { CreateDeviceSessionHandler } from './create-device-session.handler';
import { UpdateDeviceSessionHandler } from './update-device-session.handler';
import { DeleteDeviceSessionHandler } from './delete-device-session.handler';
import { DeleteAllSessionsExceptCurrentHandler } from './delete-all-sessions-except-current.handler';

export { CreateDeviceSessionCommand } from './create-device-session.command';
export { CreateDeviceSessionHandler };
export { UpdateDeviceSessionCommand } from './update-device-session.command';
export { UpdateDeviceSessionHandler };
export { DeleteDeviceSessionCommand } from './delete-device-session.command';
export { DeleteDeviceSessionHandler };
export { DeleteAllSessionsExceptCurrentCommand } from './delete-all-sessions-except-current.command';
export { DeleteAllSessionsExceptCurrentHandler };

export const DeviceSessionCommandHandlers = [
  CreateDeviceSessionHandler,
  UpdateDeviceSessionHandler,
  DeleteDeviceSessionHandler,
  DeleteAllSessionsExceptCurrentHandler,
];
