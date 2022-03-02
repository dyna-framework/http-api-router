import { BaseInitializer } from '@dyna/core';
import { CreateHttpServerInitializer } from '@dyna/http-server';
import { IncomingMessage, ServerResponse } from 'http';
import { BaseApiController } from '../api-controller/base.api-controller';
import * as path from 'path';
import UrlPattern from 'url-pattern';
import { urlResolve } from '../helpers';
import { FixRoutesInitializer } from './fix-routes.initializer';
import { CacheControllersInitializer } from './cache-controllers.initializer';

/**
 * Listen HTTP Requests
 */
export class ListenHttpRequestsInitializer extends BaseInitializer {

  static INTERNAL_INITIALIZER_INDEX: number = FixRoutesInitializer.INTERNAL_INITIALIZER_INDEX + 1;

  async register(): Promise<void> {
    if (!this.app) {
      return;
    }

    CacheControllersInitializer.controllers.forEach(controller => console.log('controller', controller.name, controller.getRoutes().map(e => e.path)));
  }

  async boot(): Promise<void> {
    this.httpListener();
  }

  /**
   * Listen http requests
   */
  httpListener() {
    this.app?.ex.httpServer?.addListener('request', async (req: IncomingMessage, res: ServerResponse) => {
      if (req.url === '/favicon.ico' || !req.method || !req.url) {
        return res.end();
      }

      for (const controller of CacheControllersInitializer.controllers) {
        const action = controller.getAction(req.method, req.url);

        if (!action) {
          continue;
        }

        const instance = new controller();
        const method = (instance as any)[action];

        const result = await method();

        res.write(result);
        res.end();

        return;
      }

      res.write('404!');
      res.end();

      return;
    });
  }

}