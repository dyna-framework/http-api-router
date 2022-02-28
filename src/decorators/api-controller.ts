import { BaseApiController } from "./../api-controller/base.api-controller";
import caller from 'caller';

export function ApiController(path?: string) {
  return function (constructor: typeof BaseApiController) {
    constructor.INTERNAL_BASE_PATH = path;
    constructor.INTERNAL_CALLER = caller();
  }
}
