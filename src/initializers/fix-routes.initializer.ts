import { BaseInitializer } from '@dyna/core'
import { urlResolve } from '../helpers'
import { CacheControllersInitializer } from './cache-controllers.initializer'
import { FixControllersInitializer } from './fix-controllers.initializer'
import UrlPattern from 'url-pattern'

/**
 * Fix routes
 */
export class FixRoutesInitializer extends BaseInitializer {
  async register(): Promise<void> {
    CacheControllersInitializer.controllers.forEach((controller) => {
      // Every route
      controller.getRoutes().map((route) => {
        const controllerPath = controller.getControllerPath()

        // Fix route values
        route.method = (route.method ?? 'get').toUpperCase()
        route.path = urlResolve(`${controllerPath}/${route.path}`)
        route.pattern = new UrlPattern(route.path)
        return route
      })
    })
  }

  async boot(): Promise<void> {}

  static getInitializerIndex(): number {
    return FixControllersInitializer.getInitializerIndex() + 1
  }
}
