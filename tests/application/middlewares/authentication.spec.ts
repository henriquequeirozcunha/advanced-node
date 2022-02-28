import { forbidden, HttpResponse } from '@/application/helpers'
import { ForbiddenError } from '@/application/errors'

type HttpRequest = {
  authorization: string
}

class AuthenticationMiddleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse<Error>> {
    return forbidden()
  }
}

describe('AuthenticationMiddleware', () => {
  let sut: AuthenticationMiddleware

  beforeEach(() => {
    sut = new AuthenticationMiddleware()
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
})
