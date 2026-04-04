export class UpdateConfirmationCodeCommand {
  constructor(
    public readonly userId: string,
    public readonly confirmationCode: string,
    public readonly expirationDate: Date,
  ) {}
}
