import { ParameterDecorator } from 'ts-ext-decorators'
import { ActionParameters } from './../initializers/listen-http-requests.initializer'

/**
 * Native Request (IncomingMessage) decorator
 * @returns native request object (IncomingMessage)
 */
export function NativeRequest() {
  return (target: any, propertyKey: string, parameterIndex: number) => {
    ParameterDecorator.create_prototype(target, propertyKey, parameterIndex, (data: ActionParameters) => {
      return data.req
    })
  }
}
