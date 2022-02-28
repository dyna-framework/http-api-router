import { BaseResource } from '@dyna/core';
import { IncomingMessage } from 'http';
import * as path from 'path';
import UrlPattern from 'url-pattern';

interface Route {
  method: string;
  action: string;
  path: string;
  pattern: UrlPattern|null;
}

/**
 * Base API Controller
 */
export class BaseApiController extends BaseResource {

  static INTERNAL_RESOURCE_TYPE: string = '@dyna:api-controller';
  static INTERNAL_BASE_PATH?: string;
  static INTERNAL_MATCH_ROUTES: Route[];
  static INTERNAL_CALLER: string;

  static getActionByRequest(req: IncomingMessage): { action: string, match: { [key: string]: any } }|null {
    if (!req.url) {
      return null;
    }

    const url = path.resolve(req.url);

    for (const route of this.INTERNAL_MATCH_ROUTES||[]) {
      if (route.method.toUpperCase() !== req.method?.toUpperCase()) {
        continue;
      }

      const match = route.pattern?.match(url);

      if (!match) {
        continue;
      }

      return { action: route.action, match };
    }

    return null;
  }

}
