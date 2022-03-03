import { ParameterDecorator } from 'ts-ext-decorators'
import { ActionParameters } from '../initializers/listen-http-requests.initializer'

/**
 * Native Response (ServerResponse) decorator
 * @returns native response object (ServerResponse)
 */
export function NativeResponse() {
  return (target: any, propertyKey: string, parameterIndex: number) => {
    ParameterDecorator.create_prototype(target, propertyKey, parameterIndex, (data: ActionParameters) => {
      return data.res
    })
  }
}
