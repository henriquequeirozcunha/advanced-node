export class RequiredFieldError extends Error {
  constructor (fieldName?: string) {
    const message = fieldName === undefined ? 'Field required' : `The field ${fieldName} is required`

    super(message)

    this.name = 'RequiredFieldError'
  }
}

export class InvalidMimeTypeError extends Error {
  constructor (allowed: string[]) {
    super(`Unupported type. Allowed types: ${allowed.join(', ')}`)
    this.name = 'InvalidMimeTypeError'
  }
}

export class MaxFileSizeError extends Error {
  constructor (maxSizeInMB: number) {
    super(`File upload limit is ${maxSizeInMB} MB`)
    this.name = 'MaxFileSizeError'
  }
}
