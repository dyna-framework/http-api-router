import { IncomingMessage, ServerResponse } from 'http'
import { Response } from '../response/response'

/**
 * Error handler function
 */
export type ErrorHandlerFn = (err: unknown, req: IncomingMessage, res: ServerResponse) => Promise<Response | null>

/**
 * Error handler instance
 */
export class ErrorHandler {
  private handler: ErrorHandlerFn | null = null

  /**
   * Register error handler function
   * @param fn handler function
   */
  register(fn: ErrorHandlerFn) {
    this.handler = fn
  }

  /**
   * Get current handler function
   * @param err Error instance
   * @param req native request (IncomingMessage)
   * @param res native response (ServerResponse)
   * @returns current handler function
   */
  async getResponse(err: unknown, req: IncomingMessage, res: ServerResponse): Promise<Response | null> {
    return this.handler ? await this.handler(err, req, res) : null
  }
}
