export class User {
  constructor(
    public id: string,
    public email: string,
    public fullName: string,
    public created_at: Date = new Date(),
  ) {}
}
