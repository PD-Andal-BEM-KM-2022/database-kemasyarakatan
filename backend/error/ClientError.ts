export class ClientError extends Error {
  constructor(message: string, public status: number = 400) {
    super(message);
    this.status = status;
    this.name = "ClientError";
  }
}

export class InputError extends ClientError {
  constructor(message: string) {
    super(message, 400);
    this.name = "InputError";
  }
}
