import { GetAllUsersHandler } from './get-all-users.handler';
import { FindUserByIdHandler } from './find-user-by-id.handler';
import { FindUserByEmailHandler } from './find-user-by-email.handler';
import { FindUserByLoginHandler } from './find-user-by-login.handler';
import { FindUserByConfirmationCodeHandler } from './find-user-by-confirmation-code.handler';
import { FindUserByRecoveryCodeHandler } from './find-user-by-recovery-code.handler';
import { CheckCredentialsHandler } from './check-credentials.handler';

export { GetAllUsersQuery } from './get-all-users.query';
export { GetAllUsersHandler };
export { FindUserByIdQuery } from './find-user-by-id.query';
export { FindUserByIdHandler };
export { FindUserByEmailQuery } from './find-user-by-email.query';
export { FindUserByEmailHandler };
export { FindUserByLoginQuery } from './find-user-by-login.query';
export { FindUserByLoginHandler };
export { FindUserByConfirmationCodeQuery } from './find-user-by-confirmation-code.query';
export { FindUserByConfirmationCodeHandler };
export { FindUserByRecoveryCodeQuery } from './find-user-by-recovery-code.query';
export { FindUserByRecoveryCodeHandler };
export { CheckCredentialsQuery } from './check-credentials.query';
export { CheckCredentialsHandler };

export const QueryHandlers = [
  GetAllUsersHandler,
  FindUserByIdHandler,
  FindUserByEmailHandler,
  FindUserByLoginHandler,
  FindUserByConfirmationCodeHandler,
  FindUserByRecoveryCodeHandler,
  CheckCredentialsHandler,
];
