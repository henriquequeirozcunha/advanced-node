import { FacebookAuthentication } from '@/domain/features'
import { mock, MockProxy } from 'jest-mock-extended'

class FacebookLoginController {
  constructor (private readonly facebookAuthentication: FacebookAuthentication) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
    await this.facebookAuthentication.perform({ token: httpRequest.token })

    return {
      statusCode: 400,
      data: new Error('The field token is required')
    }
  }
}

type HttpResponse = {
  statusCode: number
  data: any
}

describe('FacebookLoginController', () => {
  let sut: FacebookLoginController
  let facebookAuth: MockProxy<FacebookAuthentication>

  beforeEach(() => {
    facebookAuth = mock<FacebookAuthentication>()
    sut = new FacebookLoginController(facebookAuth)
  })

  it('should return 400 if token is empty', async () => {
    const response = await sut.handle({ token: '' })

    expect(response).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })

  it('should return 400 if token is null', async () => {
    const response = await sut.handle({ token: null })

    expect(response).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })

  it('should return 400 if token is undefined', async () => {
    const response = await sut.handle({ token: undefined })

    expect(response).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })

  it('should call FacebookAuthentication with correct params', async () => {
    await sut.handle({ token: 'any_token' })

    expect(facebookAuth.perform).toHaveBeenCalledWith({ token: 'any_token' })
    expect(facebookAuth.perform).toHaveBeenCalledTimes(1)
  })
})
