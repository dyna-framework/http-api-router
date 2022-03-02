import { BaseInitializer } from '@dyna/core';
import { CreateHttpServerInitializer } from '@dyna/http-server';
import { urlResolve } from '../helpers';
import { BaseApiController } from './../api-controller/base.api-controller';
import { CacheControllersInitializer } from './cache-controllers.initializer';
import * as path from 'path';
import { FixControllersInitializer } from './fix-controllers.initializer';

/**
 * Fix routes
 */
export class FixRoutesInitializer extends BaseInitializer {

  static INTERNAL_INITIALIZER_INDEX: number = FixControllersInitializer.INTERNAL_INITIALIZER_INDEX + 1;

  async register(): Promise<void> {
    CacheControllersInitializer.controllers.forEach(controller => {
      if (!this.app?.sourcePath) {
        return;
      }

      const pathFolder = urlResolve(path.dirname(controller.getControllerCaller()).replace(this.app?.sourcePath, ''));
      const uri = typeof controller.getControllerPath() === 'undefined' ? pathFolder : controller.getControllerPath() ?? '/';
      controller.setControllerPath(urlResolve(uri));
    });
  }

  async boot(): Promise<void> {

  }

}