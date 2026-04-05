export class UpdateDeviceSessionCommand {
  constructor(
    public readonly deviceId: string,
    public readonly issuedAt: Date,
    public readonly expirationDate: Date,
  ) {}
}
