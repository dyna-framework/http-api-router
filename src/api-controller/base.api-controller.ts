import { BaseResource } from '@dyna/core';
import { IncomingMessage } from 'http';
import UrlPattern from 'url-pattern';
import { urlResolve } from '../helpers';

interface Route {
  method: string;
  action: string;
  path: string;
  pattern?: UrlPattern;
}

/**
 * Base API Controller
 */
export class BaseApiController extends BaseResource {

  static INTERNAL_RESOURCE_TYPE: string = '@dyna:api-controller';
  private static INTERNAL_BASE_PATH: string;
  private static INTERNAL_MATCH_ROUTES: Route[];
  private static INTERNAL_CALLER: string;

  static getAction(method: string, url: string): string|null {
    if (!url) {
      return null;
    }

    url = urlResolve(url);

    for (const route of this.getRoutes()) {
      if (route.method.toUpperCase() !== method.toUpperCase()) {
        continue;
      }

      const match = route.pattern?.match(url);

      if (!match) {
        continue;
      }

      return route.action;
    }

    return null;
  }

  static addRoute(route: Route) {
    if (!(this.INTERNAL_MATCH_ROUTES instanceof Array)) {
      this.INTERNAL_MATCH_ROUTES = [];
    }

    this.INTERNAL_MATCH_ROUTES.push(route);
  }

  static getRoutes(): Route[] {
    return this.INTERNAL_MATCH_ROUTES || [];
  }

  static setControllerCaller(caller: string) {
    this.INTERNAL_CALLER = caller;
  }

  static getControllerCaller(): string {
    return this.INTERNAL_CALLER;
  }

  static setControllerPath(path: string) {
    this.INTERNAL_BASE_PATH = path;
  }

  static getControllerPath(): string {
    return this.INTERNAL_BASE_PATH;
  }

}
