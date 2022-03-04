import { IncomingMessage, ServerResponse } from 'http'
import { Response } from '../response/response'

export type ErrorHandlerFn = (err: unknown, req: IncomingMessage, res: ServerResponse) => Promise<Response | null>

export class ErrorHandler {
  private handler: ErrorHandlerFn | null = null

  register(fn: ErrorHandlerFn) {
    this.handler = fn
  }

  async getResponse(err: unknown, req: IncomingMessage, res: ServerResponse): Promise<Response | null> {
    return this.handler ? await this.handler(err, req, res) : null
  }
}
