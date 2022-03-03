import { BaseInitializer } from '@dyna/core'
import { IncomingMessage, ServerResponse } from 'http'
import { FixRoutesInitializer } from './fix-routes.initializer'
import { CacheControllersInitializer } from './cache-controllers.initializer'
import { Response } from './../response/response'

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

      // All controllers
      for (const controller of CacheControllersInitializer.controllers) {
        const action = controller.getAction(req.method, req.url)

        // No match
        if (!action) {
          continue
        }

        // Instance controller
        const instance = new controller()
        const method = (instance as any)[action]

        // Execute action
        const result = await method()

        // Parse result
        const parsed = this.parseToResponse(result)

        // Show response
        return this.showResponse(req, res, parsed)
      }

      res.write('404!')
      res.end()

      return
    })
  }

  showResponse(req: IncomingMessage, res: ServerResponse, response: Response) {
    // Set headers
    res.setHeader('Content-Type', response.getContentType())

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
