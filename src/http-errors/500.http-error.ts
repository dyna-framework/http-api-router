import { HttpError } from './base.http-error'

export class HttpError500 extends HttpError {
  constructor(public err: Error) {
    super(500, 'Internal Server Error')
  }
}
