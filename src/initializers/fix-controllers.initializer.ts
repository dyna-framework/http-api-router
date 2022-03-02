import { BaseInitializer } from '@dyna/core';
import { CreateHttpServerInitializer } from '@dyna/http-server';
import { urlResolve } from '../helpers';
import { BaseApiController } from './../api-controller/base.api-controller';
import { CacheControllersInitializer } from './cache-controllers.initializer';
import * as path from 'path';

/**
 * Fix controllers
 */
export class FixControllersInitializer extends BaseInitializer {

  static INTERNAL_INITIALIZER_INDEX: number = CacheControllersInitializer.INTERNAL_INITIALIZER_INDEX + 1;

  async register(): Promise<void> {
    CacheControllersInitializer.controllers.forEach(controller => {
      // Current controller base path
      const currentPath = controller.getControllerPath();

      // If no base path, set base path as folder path
      if (!currentPath && this.app?.sourcePath) {
        const absoluteFolder = path.dirname(controller.getControllerCaller());
        const relativeFolder = absoluteFolder.replace(this.app.sourcePath, '');
        controller.setControllerPath(relativeFolder);
      }

      // If no base path, set base path as "/"
      if (!currentPath && !this.app?.sourcePath) {
        controller.setControllerPath('/'); 
      }

      // Fix base path
      const fixedPath = urlResolve(controller.getControllerPath());
      controller.setControllerPath(fixedPath);
    });
  }

  async boot(): Promise<void> {

  }

}