import { BaseInitializer } from '@dyna/core';
import { CreateHttpServerInitializer } from '@dyna/http-server';
import { IncomingMessage, ServerResponse } from 'http';
import { BaseApiController } from './api-controller/base.api-controller';
import * as path from 'path';
import UrlPattern from 'url-pattern';

/**
 * HTTP Api Router Initializer (api routes)
 */
export class HttpApiRouterInitializer extends BaseInitializer {

  static INTERNAL_INITIALIZER_INDEX: number = CreateHttpServerInitializer.INTERNAL_INITIALIZER_INDEX + 1;

  private controllers: typeof BaseApiController[] = [];

  /**
   * 
   */
  async register(): Promise<void> {
    if (!this.app) {
      return;
    }

    this.cacheControllers();
  }

  /**
   * 
   */
  async boot(): Promise<void> {
    this.httpListener();
  }

  /**
   * Cache controllers
   */
  cacheControllers() {
    this.controllers = this.app?.resources.only<typeof BaseApiController>(BaseApiController.INTERNAL_RESOURCE_TYPE) || [];
    this.controllers.forEach(controller => this.app && controller.prototype.setApplication(this.app));
    this.controllers.forEach(controller => {
      const base = path.dirname(controller.INTERNAL_CALLER||'').replace(this.app?.sourcePath||'', '');

      controller.INTERNAL_BASE_PATH = typeof controller.INTERNAL_BASE_PATH === 'undefined' ? base : controller.INTERNAL_BASE_PATH;
      controller.INTERNAL_MATCH_ROUTES?.map(route => {
        route.method = route.method.toUpperCase();
        route.path = path.resolve(`${base}/${route.path}`);
        route.pattern = new UrlPattern(route.path);
        return route;
      });
    });

    this.controllers.forEach(controller => console.log('controller', controller.INTERNAL_MATCH_ROUTES));
  }

  /**
   * Listen http requests
   */
  httpListener() {
    this.app?.ex.httpServer?.addListener('request', (req: IncomingMessage, res: ServerResponse) => {
      if (req.url === '/favicon.ico') {
        return res.end();
      }

      for (const controller of this.controllers) {
        const action = controller.getActionByRequest(req);
        
        if (!action) {
          continue;
        }

        console.log('action', action);
      }

      res.write('hola!');
      res.end();
    });
  }

}