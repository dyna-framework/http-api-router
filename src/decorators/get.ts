import { BaseApiController } from "../api-controller/base.api-controller";

export function Get(path?: string) {
  return function(target: Object, key: string, descriptor: PropertyDescriptor) {
    const controller: typeof BaseApiController = target.constructor as any;
    const resolvePath = path||key;

    controller.INTERNAL_MATCH_ROUTES = controller.INTERNAL_MATCH_ROUTES || [];
    controller.INTERNAL_MATCH_ROUTES.push({
      method: 'get',
      action: key,
      path: resolvePath,
      pattern: null,
    });

    return descriptor;
  }
}
