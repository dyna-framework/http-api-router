import { BaseApiController } from "./../api-controller/base.api-controller";
import caller from 'caller';

/**
 * Controller decorator
 * @param path base path (url)
 */
export function ApiController(path?: string) {
  return function (constructor: typeof BaseApiController) {
    if (path) {
      constructor.setControllerPath(path);
    }

    constructor.setControllerCaller(caller());
  }
}
