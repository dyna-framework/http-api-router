/**
 * Fixe or resolve a path url
 * @param uri uri url
 * @returns the uri (or url) fixed
 */
export function urlResolve(uri: string = '') {
  const path = `/${uri}`
    .split('/')
    .filter((e) => e.length)
    .join('/')
  const url = new URL(path, 'http://localhost')

  return url.pathname
}
