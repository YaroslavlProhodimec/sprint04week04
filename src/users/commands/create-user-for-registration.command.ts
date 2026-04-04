export class CreateUserForRegistrationCommand {
  constructor(
    public readonly login: string,
    public readonly email: string,
    public readonly password: string,
    public readonly confirmationCode: string,
    public readonly expirationDate: Date,
  ) {}
}
