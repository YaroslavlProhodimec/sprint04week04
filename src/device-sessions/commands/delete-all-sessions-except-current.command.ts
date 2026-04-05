export class DeleteAllSessionsExceptCurrentCommand {
  constructor(
    public readonly userId: string,
    public readonly deviceId: string,
  ) {}
}
