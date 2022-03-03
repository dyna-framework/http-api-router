import { HttpError } from './base.http-error'

export class HttpError404 extends HttpError {
  constructor() {
    super(404)
  }
}
