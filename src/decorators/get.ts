import { BaseApiController } from "../api-controller/base.api-controller";

export function Get(path?: string|string[]) {
  return function(target: Object, key: string, descriptor: PropertyDescriptor) {
    const controller: typeof BaseApiController = target.constructor as any;
    const paths = typeof path === 'string' ? [ path ] : path || [ key ];

    for (const p of paths) {
      controller.addRoute({
        method: 'get',
        action: key,
        path: p,
      });
    }

    return descriptor;
  }
}
