import { FindSessionByDeviceIdHandler } from './find-session-by-device-id.handler';
import { FindAllSessionsByUserIdHandler } from './find-all-sessions-by-user-id.handler';

export { FindSessionByDeviceIdQuery } from './find-session-by-device-id.query';
export { FindSessionByDeviceIdHandler };
export { FindAllSessionsByUserIdQuery } from './find-all-sessions-by-user-id.query';
export { FindAllSessionsByUserIdHandler };

export const DeviceSessionQueryHandlers = [
  FindSessionByDeviceIdHandler,
  FindAllSessionsByUserIdHandler,
];
