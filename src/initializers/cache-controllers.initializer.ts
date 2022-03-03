import { BaseInitializer } from '@dyna/core'
import { CreateHttpServerInitializer } from '@dyna/http-server'
import { BaseHttpController } from '../http-controller/base.http-controller'

/**
 * Cache controllers
 */
export class CacheControllersInitializer extends BaseInitializer {
  /**
   * Controllers container
   */
  static controllers: typeof BaseHttpController[] = []

  async register(): Promise<void> {
    // Get all controllers
    CacheControllersInitializer.controllers = this.app?.resources.only<typeof BaseHttpController>(BaseHttpController.getResourceType()) || []

    // Is on application
    if (this.app) {
      // Set application instance to all controllers
      CacheControllersInitializer.controllers.forEach((controller) => this.app && controller.prototype.setApplication(this.app))
    }
  }

  async boot(): Promise<void> {}

  static getInitializerIndex(): number {
    return CreateHttpServerInitializer.getInitializerIndex() + 1
  }
}
