import { BaseInitializer } from '@dyna/core';
import { CreateHttpServerInitializer } from '@dyna/http-server';
import { IncomingMessage, ServerResponse } from 'http';
import { BaseApiController } from './api-controller/base.api-controller';

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
  }

  /**
   * Listen http requests
   */
  httpListener() {
    this.app?.ex.httpServer?.addListener('request', (req: IncomingMessage, res: ServerResponse) => {
      console.log('req', req.url);
      res.write('hola!');
      res.end();
    });
  }

}