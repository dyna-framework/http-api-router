export class HttpError extends Error {
  constructor(public statusCode: number, public statusText?: string) {
    super(statusText)
  }
}
