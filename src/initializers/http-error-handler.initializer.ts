import { BaseInitializer } from '@dyna/core'
import { ErrorHandler } from '../error-handler/error-handler'

/**
 * Error handler
 */
export class HttpErrorHandlerInitializer extends BaseInitializer {
  async register(): Promise<void> {
    if (this.app) {
      (this.app.ex.httpRouterErrorHandler as ErrorHandler) = new ErrorHandler()
    }
  }
}
