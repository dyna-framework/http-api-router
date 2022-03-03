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

  /**
   * Get current content response to client
   * @returns content response
   */
  getContent() {
    return this._content
  }

  /**
   * Set content and auto detect type
   * @param content content to response
   * @returns this (Response instance)
   */
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

  /**
   * Set content html
   * @param content content html
   * @returns this (Response instance)
   */
  html(html: string) {
    this._content = html
    return this.contentType('text/html')
  }

  /**
   * Set content text
   * @param content content text
   * @returns this (Response instance)
   */
  text(text: string) {
    this._content = text
    return this.contentType('text/plain')
  }

  /**
   * Set content json
   * @param content content json
   * @returns this (Response instance)
   */
  json(json: object | null) {
    this._content = JSON.stringify(json)
    return this.contentType('application/json')
  }

  /**
   * Get ContentType header
   * @returns current content type
   */
  getContentType() {
    return this._contentType
  }

  /**
   * Set ContentType header
   * @param contentType ContentType header
   * @returns this (Response instance)
   */
  contentType(contentType: string) {
    this._contentType = contentType
    return this
  }

  /**
   * Get HTTP status
   * @returns HTTP status
   */
  getStatus() {
    return this._status
  }

  /**
   * Set HTTP status
   * @param status HTTP status
   * @returns this (Response instance)
   */
  status(status: number) {
    this._status = status
    return this
  }
}
