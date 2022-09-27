

export class HttpError extends Error {
  public status: number;
  public error: unknown;

  constructor(res: Response, error: unknown) {
    super(`Http error: ${res.statusText}`);
    this.status = res.status;
    this.error = error;
  } 
}
