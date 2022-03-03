import { BaseInitializer } from '@dyna/core'
import { ErrorHandler } from '../error-handler/error-handler'

/**
 * Extend application extra values
 */
declare module '@dyna/core' {
  interface ExtraApplication {
    httpErrorHandler?: ErrorHandler
  }
}

/**
 * Error handler
 */
export class HttpErrorHandler extends BaseInitializer {
  async register(): Promise<void> {
    if (this.app) {
      //this.app.ex.httpErrorHandler = new ErrorHandler()
    }
  }
}
