import { BaseApiController } from "../api-controller/base.api-controller";

// Methods
type AvailableMethods = 'GET'|'get'|'POST'|'post'|'PUT'|'put'|'PATCH'|'patch'|'DELETE'|'delete'|'ANY'|'any';

/**
 * HTTP Method decorator
 * @param method HTTP method
 * @param path path uri (url)
 */
export function Method(method: AvailableMethods, path?: string|string[]) {
  return function(target: Object, key: string, descriptor: PropertyDescriptor) {
    const controller: typeof BaseApiController = target.constructor as any;
    const paths = typeof path === 'string' ? [ path ] : path || [ key ];

    for (const p of paths) {
      controller.addRoute({
        method: method,
        action: key,
        path: p,
      });
    }

    return descriptor;
  }
}

/**
 * HTTP Get decorator
 * @param path HTTP GET method
 */
export function Get(path?: string|string[]) {
  return Method('GET', path);
}

/**
 * HTTP Post decorator
 * @param path HTTP POST method
 */
export function Post(path?: string|string[]) {
  return Method('POST', path);
}

/**
 * HTTP Put decorator
 * @param path HTTP PUT method
 */
export function Put(path?: string|string[]) {
  return Method('PUT', path);
}

/**
 * HTTP Patch decorator
 * @param path HTTP PATCH method
 */
export function Patch(path?: string|string[]) {
  return Method('PATCH', path);
}

/**
 * HTTP Delete decorator
 * @param path HTTP DELETE method
 */
 export function Delete(path?: string|string[]) {
  return Method('DELETE', path);
}

/**
 * HTTP Any decorator
 * @param path HTTP ANY method (special method)
 */
 export function Any(path?: string|string[]) {
  return Method('ANY', path);
}
