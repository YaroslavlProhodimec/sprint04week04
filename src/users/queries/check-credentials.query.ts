export class CheckCredentialsQuery {
  constructor(
    public readonly loginOrEmail: string,
    public readonly password: string,
  ) {}
}
