import { forbidden, HttpResponse, ok } from '@/application/helpers'
import { ForbiddenError } from '@/application/errors'
import { RequiredStringValidator } from '@/application/validation'
import { Authorize } from '@/domain/services'

type HttpRequest = {
  authorization: string
}
type Model = Error | { userId: string }

class AuthenticationMiddleware {
  constructor (
    private readonly authorize: Authorize
  ) {}

  async handle ({ authorization }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      if (!this.validate({ authorization })) return forbidden()

      const userId = await this.authorize({ token: authorization })

      return ok({ userId })
    } catch {
      return forbidden()
    }
  }

  private validate ({ authorization }: HttpRequest): boolean {
    const error = new RequiredStringValidator(authorization, 'authorization').validate()

    return error === undefined
  }
}

describe('AuthenticationMiddleware', () => {
  let sut: AuthenticationMiddleware
  let authorize: jest.Mock
  let authorization: string

  beforeEach(() => {
    sut = new AuthenticationMiddleware(authorize)
  })

  beforeAll(() => {
    authorization = 'any_authorization_token'
    authorize = jest.fn().mockResolvedValue('any_user_id')
  })

  it('should return 403 if Authorization is empty', async () => {
    const httpReponse = await sut.handle({ authorization: '' })
    expect(httpReponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should return 403 if Authorization is null', async () => {
    const httpReponse = await sut.handle({ authorization: null as any })
    expect(httpReponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should return 403 if Authorization is undefined', async () => {
    const httpReponse = await sut.handle({ authorization: undefined as any })
    expect(httpReponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should call authorize with correct params', async () => {
    await sut.handle({ authorization })

    expect(authorize).toHaveBeenCalledWith({ token: authorization })
    expect(authorize).toHaveBeenCalledTimes(1)
  })

  it('should return 403 if Authorize throws', async () => {
    authorize.mockRejectedValueOnce(new Error('any_error'))

    const httpReponse = await sut.handle({ authorization })

    expect(httpReponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should return 200 with userId on success', async () => {
    const httpReponse = await sut.handle({ authorization })

    expect(httpReponse).toEqual({
      statusCode: 200,
      data: { userId: 'any_user_id' }
    })
  })
})
