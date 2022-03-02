export function urlResolve(uri: string = '') {
  const path = `/${uri}`.split('/').filter(e => e.length).join('/');
  const url = new URL(path, 'http://localhost');

  return url.pathname;
}
