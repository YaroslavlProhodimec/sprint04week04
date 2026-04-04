export class SetRecoveryCodeCommand {
  constructor(
    public readonly userId: string,
    public readonly recoveryCode: string,
    public readonly expirationDate: Date,
  ) {}
}
