import { BaseInitializer } from '@dyna/core';
import { CreateHttpServerInitializer } from '@dyna/http-server';
import { IncomingMessage, ServerResponse } from 'http';

export class HttpApiRouterInitializer extends BaseInitializer {

  static INTERNAL_INITIALIZER_INDEX: number = CreateHttpServerInitializer.INTERNAL_INITIALIZER_INDEX + 1;

  async register(): Promise<void> {
    this.app?.ex.httpServer?.addListener('request', (req: IncomingMessage, res: ServerResponse) => {
      res.write('hola!');
      res.end();
    });
  }

}