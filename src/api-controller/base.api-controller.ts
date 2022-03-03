import { BaseResource } from '@dyna/core'
import UrlPattern from 'url-pattern'
import { urlResolve } from '../helpers'

/**
 * Route data
 */
interface Route {
  method: string
  action: string
  path: string
  pattern?: UrlPattern
}

/**
 * Base API Controller
 */
export class BaseApiController extends BaseResource {
  static INTERNAL_RESOURCE_TYPE: string = '@dyna:api-controller'
  private static INTERNAL_BASE_PATH: string
  private static INTERNAL_MATCH_ROUTES: Route[]
  private static INTERNAL_CALLER: string

  /**
   * Get the action name by an HTTP method and url
   * @param method HTTP Method
   * @param url path url
   * @returns an action name or null if not match
   */
  static getAction(method: string, url: string): string | null {
    url = urlResolve(url || '')

    // All controller routes
    for (const route of this.getRoutes()) {
      // Skip if different http method
      if (route.method.toUpperCase() === 'ANY' && route.method.toUpperCase() !== method.toUpperCase()) {
        continue
      }

      const match = route.pattern?.match(url)

      // No match route
      if (!match) {
        continue
      }

      // Match route
      return route.action
    }

    return null
  }

  /**
   * Add route
   * @param route an route object
   */
  static addRoute(route: Route) {
    if (!(this.INTERNAL_MATCH_ROUTES instanceof Array)) {
      this.INTERNAL_MATCH_ROUTES = []
    }

    this.INTERNAL_MATCH_ROUTES.push(route)
  }

  /**
   * Get all routes into this controller
   * @returns Routes
   */
  static getRoutes(): Route[] {
    return this.INTERNAL_MATCH_ROUTES || []
  }

  /**
   * Set the controller caller
   * @param caller caller (file executor)
   */
  static setControllerCaller(caller: string) {
    this.INTERNAL_CALLER = caller
  }

  /**
   * Get the controller caller
   * @returns caller (file executor)
   */
  static getControllerCaller(): string {
    return this.INTERNAL_CALLER
  }

  /**
   * Set base path to controller
   * @param path base path
   */
  static setControllerPath(path: string) {
    this.INTERNAL_BASE_PATH = path
  }

  /**
   * Get base path controller
   * @returns base path
   */
  static getControllerPath(): string {
    return this.INTERNAL_BASE_PATH
  }
}
