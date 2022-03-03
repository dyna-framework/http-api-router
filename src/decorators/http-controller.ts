import { BaseHttpController } from '../http-controller/base.http-controller'
import caller from 'caller'

/**
 * Controller decorator
 * @param path base path (url)
 */
export function HttpController(path?: string) {
  return function (constructor: typeof BaseHttpController) {
    if (path) {
      constructor.setControllerPath(path)
    }

    constructor.setControllerCaller(caller())
  }
}
