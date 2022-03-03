import { BaseInitializer } from '@dyna/core';
import { IncomingMessage, ServerResponse } from 'http';
import { FixRoutesInitializer } from './fix-routes.initializer';
import { CacheControllersInitializer } from './cache-controllers.initializer';

/**
 * Listen HTTP Requests
 */
export class ListenHttpRequestsInitializer extends BaseInitializer {

  static INTERNAL_INITIALIZER_INDEX: number = FixRoutesInitializer.INTERNAL_INITIALIZER_INDEX + 1;

  async register(): Promise<void> {

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

      // All controllers
      for (const controller of CacheControllersInitializer.controllers) {
        const action = controller.getAction(req.method, req.url);

        // No match
        if (!action) {
          continue;
        }

        // Instance controller
        const instance = new controller();
        const method = (instance as any)[action];

        // Execute action
        const result = await method();

        // Show result
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