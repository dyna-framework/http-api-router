import { ParameterDecorator } from 'ts-ext-decorators'
import { ActionParameters } from '../initializers/listen-http-requests.initializer'

/**
 * Get input from request decorator
 * @returns native request object (IncomingMessage)
 */
export function Input() {
  return (target: any, propertyKey: string, parameterIndex: number) => {
    ParameterDecorator.create_prototype(target, propertyKey, parameterIndex, (data: ActionParameters) => {
      return null
    })
  }
}
