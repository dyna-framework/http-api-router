export function NativeRequest() {
  return (target: any, propertyKey: string, parameterIndex: number) => {
    console.log('target', propertyKey)
  }
}
