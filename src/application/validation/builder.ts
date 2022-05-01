import { RequiredString, Validator, Required, RequiredBuffer } from '@/application/validation'
import { AllowedMimeTypes, Extensions } from './allowed-mime-types'
import { MaxFileSize } from './max-file-size'

export class ValidationBuilder {
  private constructor (
    private readonly value: any,
    private readonly name?: string,
    private readonly validators: Validator[] = []
  ) {}

  static of ({ value, fieldName }: { value: any, fieldName?: string }): ValidationBuilder {
    return new ValidationBuilder(value, fieldName)
  }

  required (): ValidationBuilder {
    if (this.value instanceof Buffer) {
      this.validators.push(new RequiredBuffer(this.value, this.name))
    } else if (typeof this.value === 'string') {
      this.validators.push(new RequiredString(this.value, this.name))
    } else if (typeof this.value === 'object') {
      this.validators.push(new Required(this.value, this.name))

      if (this.value.buffer !== undefined) {
        this.validators.push(new RequiredBuffer(this.value.buffer, this.name))
      }
    }

    return this
  }

  image ({ allowed, maxSizeInMb }: { allowed: Extensions[], maxSizeInMb: number }): ValidationBuilder {
    if (this.value.mimeType !== undefined) {
      this.validators.push(new AllowedMimeTypes(allowed, this.value.mimeType))
    }

    if (this.value.buffer !== undefined) {
      this.validators.push(new MaxFileSize(maxSizeInMb, this.value.buffer))
    }

    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
