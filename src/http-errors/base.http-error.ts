export class HttpError extends Error {
  constructor(public statusCode: number, public statusText?: string) {
    super(statusText)

    if (!statusText) this.statusText = `HTTP Error ${this.statusCode}`
  }
}
