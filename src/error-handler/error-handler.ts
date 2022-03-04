import { IncomingMessage, ServerResponse } from 'http'
import { Response } from '../response/response'

export type ErrorHandlerFn = (err: unknown, req: IncomingMessage, res: ServerResponse) => Response | null

export class ErrorHandler {
  private handler: ErrorHandlerFn | null = null

  register(fn: ErrorHandlerFn) {
    this.handler = fn
  }

  getResponse(err: unknown, req: IncomingMessage, res: ServerResponse): Response | null {
    return this.handler ? this.handler(err, req, res) : null
  }
}
