import { BaseInitializer } from '@dyna/core'
import { urlResolve } from '../helpers'
import { CacheControllersInitializer } from './cache-controllers.initializer'
import * as path from 'path'

/**
 * Fix controllers
 */
export class FixControllersInitializer extends BaseInitializer {
  async register(): Promise<void> {
    CacheControllersInitializer.controllers.forEach((controller) => {
      // Current controller base path
      const currentPath = controller.getControllerPath()

      // If no base path, set base path as folder path
      if (!currentPath && this.app?.sourcePath) {
        const absoluteFolder = path.dirname(controller.getControllerCaller())
        const relativeFolder = absoluteFolder.replace(this.app.sourcePath, '')
        controller.setControllerPath(relativeFolder)
      }

      // If no base path, set base path as "/"
      if (!currentPath && !this.app?.sourcePath) {
        controller.setControllerPath('/')
      }

      // Fix base path
      const fixedPath = urlResolve(controller.getControllerPath())
      controller.setControllerPath(fixedPath)
    })
  }

  async boot(): Promise<void> {}

  static getInitializerIndex(): number {
    return CacheControllersInitializer.getInitializerIndex() + 1
  }
}
