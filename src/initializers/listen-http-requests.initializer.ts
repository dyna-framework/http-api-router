import { BaseInitializer } from '@dyna/core'
import { IncomingMessage, ServerResponse } from 'http'
import { FixRoutesInitializer } from './fix-routes.initializer'
import { CacheControllersInitializer } from './cache-controllers.initializer'
import { Route } from './../api-controller/base.api-controller'
import { Response } from './../response/response'
import { ParameterDecorator } from 'ts-ext-decorators'
import { HttpError404 } from '../http-errors/404.http-error'
import { HttpError } from '../http-errors/base.http-error'

/**
 * Action parameters
 */
export interface ActionParameters {
  req: IncomingMessage
  res: ServerResponse
  route: Route
  ex: ExtraParameters
}

/**
 * Extra parameters
 */
export interface ExtraParameters {}

/**
 * Listen HTTP Requests
 */
export class ListenHttpRequestsInitializer extends BaseInitializer {
  async register(): Promise<void> {}

  async boot(): Promise<void> {
    this.httpListener()
  }

  /**
   * Listen http requests
   */
  httpListener() {
    this.app?.ex.httpServer?.addListener('request', async (req: IncomingMessage, res: ServerResponse) => {
      if (req.url === '/favicon.ico' || !req.method || !req.url) {
        return res.end()
      }

      try {
        // All controllers
        for (const controller of CacheControllersInitializer.controllers) {
          const route = controller.getRoute(req.method, req.url)

          // No match
          if (!route) {
            continue
          }

          // Instance controller
          const instance = new controller()
          const action = ParameterDecorator.method(instance, route.action)
          const method: (data: ActionParameters) => any = (instance as any)[action].bind(instance)

          // Execute action
          const result = await method({ req, res, route, ex: {} })

          // Parse result
          const parsed = this.parseToResponse(result)

          // Show response
          return this.showResponse(req, res, parsed)
        }

        // Route not found
        throw new HttpError404()
      } catch (err) {
        // Http Error
        if (err instanceof HttpError) {
          return this.showResponse(req, res, new Response().status(err.statusCode).content(err.statusText))
        }
      }
    })
  }

  showResponse(req: IncomingMessage, res: ServerResponse, response: Response) {
    // Set headers
    res.setHeader('Content-Type', response.getContentType())

    // Set others
    res.statusCode = response.getStatus()

    // Write to client
    res.write(response.getContent())

    // End connection
    res.end()
  }

  parseToResponse(result: any): Response {
    if (!(result instanceof Response)) {
      return new Response().content(result)
    }

    return result
  }

  static getInitializerIndex(): number {
    return FixRoutesInitializer.getInitializerIndex() + 1
  }
}
