/**
 * HTTP response
 */
export class Response {
  /**
   * Private data
   */
  private _content!: string
  private _status: number = 200
  private _contentType!: string

  getContent() {
    return this._content
  }

  content(content: any) {
    const type = typeof content

    switch (type) {
      case 'string': {
        this.html(content)
        break
      }
      case 'number':
      case 'bigint':
      case 'boolean':
      case 'undefined':
      case 'function':
      case 'object': {
        this.json(content)
        break
      }
    }

    return this
  }

  html(html: string) {
    this._content = html
    return this.contentType('text/html')
  }

  text(text: string) {
    this._content = text
    return this.contentType('text/plain')
  }

  json(json: object | null) {
    this._content = JSON.stringify(json)
    return this.contentType('application/json')
  }

  getContentType() {
    return this._contentType
  }

  contentType(contentType: string) {
    this._contentType = contentType
    return this
  }

  getStatus() {
    return this._status
  }

  status(status: number) {
    this._status = status
    return this
  }
}
