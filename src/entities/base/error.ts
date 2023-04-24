export class XError extends Error {
  code: string | number

  constructor(code: string | number, message: string) {
    super(message)
    this.code = code
  }

  toString() {
    return this.name + ': [' + this.code + '] ' + this.message
  }
}
