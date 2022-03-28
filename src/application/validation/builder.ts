import { RequiredString, Validator } from '@/application/validation'

export class ValidationBuilder {
  private constructor (
    private readonly field: string,
    private readonly name: string,
    private readonly validators: Validator[] = []
  ) {}

  static of (params: { value: string, fieldName: string }): ValidationBuilder {
    return new ValidationBuilder(params.value, params.fieldName)
  }

  required (): ValidationBuilder {
    this.validators.push(new RequiredString(this.field, this.name))

    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
