import { BaseInitializer } from '@dyna/core'
import { IncomingMessage, ServerResponse } from 'http'
import { FixRoutesInitializer } from './fix-routes.initializer'
import { CacheControllersInitializer } from './cache-controllers.initializer'
import { Route } from '../http-controller/base.http-controller'
import { Response } from '../response/response'
import { ParameterDecorator } from 'ts-ext-decorators'
import { HttpError404 } from '../http-errors/404.http-error'
import { HttpError } from '../http-errors/base.http-error'
import { HttpError500 } from '../http-errors/500.http-error'
import { ErrorHandler } from '../error-handler/error-handler'

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
        // HTTP error
        const error: HttpError = err instanceof HttpError ? err : new HttpError500(err as any)

        // Error handler response
        const errorHandlerResponse = (this.app?.ex.httpErrorHandler as ErrorHandler)?.getResponse();

        // Has error handler
        if (errorHandlerResponse instanceof Response) {
          return this.showResponse(req, res, errorHandlerResponse)
        } else {
          // Show response error
          console.error(error)
          return this.showResponse(req, res, new Response().status(error.statusCode).content(error.statusText))
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
