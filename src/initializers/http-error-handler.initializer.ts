import { BaseInitializer } from '@dyna/core'
import { ErrorHandler } from '../error-handler/error-handler'

/**
 * Error handler
 */
export class HttpErrorHandler extends BaseInitializer {
  async register(): Promise<void> {
    if (this.app) {
      (this.app.ex.httpErrorHandler as ErrorHandler) = new ErrorHandler()
    }
  }
}
