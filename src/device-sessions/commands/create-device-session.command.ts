export class CreateDeviceSessionCommand {
  constructor(
    public readonly userId: string,
    public readonly deviceId: string,
    public readonly issuedAt: Date,
    public readonly expirationDate: Date,
    public readonly ip: string,
    public readonly deviceName: string,
  ) {}
}
