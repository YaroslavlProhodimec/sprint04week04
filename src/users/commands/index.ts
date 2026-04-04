import { CreateUserHandler } from './create-user.handler';
import { DeleteUserHandler } from './delete-user.handler';
import { CreateUserForRegistrationHandler } from './create-user-for-registration.handler';
import { ConfirmUserHandler } from './confirm-user.handler';
import { UpdateConfirmationCodeHandler } from './update-confirmation-code.handler';
import { SetRecoveryCodeHandler } from './set-recovery-code.handler';
import { SetNewPasswordHandler } from './set-new-password.handler';

export { CreateUserCommand } from './create-user.command';
export { CreateUserHandler };
export { DeleteUserCommand } from './delete-user.command';
export { DeleteUserHandler };
export { CreateUserForRegistrationCommand } from './create-user-for-registration.command';
export { CreateUserForRegistrationHandler };
export { ConfirmUserCommand } from './confirm-user.command';
export { ConfirmUserHandler };
export { UpdateConfirmationCodeCommand } from './update-confirmation-code.command';
export { UpdateConfirmationCodeHandler };
export { SetRecoveryCodeCommand } from './set-recovery-code.command';
export { SetRecoveryCodeHandler };
export { SetNewPasswordCommand } from './set-new-password.command';
export { SetNewPasswordHandler };

export const CommandHandlers = [
  CreateUserHandler,
  DeleteUserHandler,
  CreateUserForRegistrationHandler,
  ConfirmUserHandler,
  UpdateConfirmationCodeHandler,
  SetRecoveryCodeHandler,
  SetNewPasswordHandler,
];
