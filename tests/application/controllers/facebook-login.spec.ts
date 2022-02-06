import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { FacebookLoginController } from '@/application/controllers'
import { RequiredFieldError, ServerError, UnauthorizedError } from '@/application/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookLoginController', () => {
  let sut: FacebookLoginController
  let facebookAuth: MockProxy<FacebookAuthentication>

  beforeEach(() => {
    facebookAuth = mock<FacebookAuthentication>()
    facebookAuth.perform.mockResolvedValue(new AccessToken('any_value'))
    sut = new FacebookLoginController(facebookAuth)
  })

  it('should return 400 if token is empty', async () => {
    const response = await sut.handle({ token: '' })

    expect(response).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('token')
    })
  })

  it('should return 400 if token is null', async () => {
    const response = await sut.handle({ token: null })

    expect(response).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('token')
    })
  })

  it('should return 400 if token is undefined', async () => {
    const response = await sut.handle({ token: undefined })

    expect(response).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('token')
    })
  })

  it('should call FacebookAuthentication with correct params', async () => {
    await sut.handle({ token: 'any_token' })

    expect(facebookAuth.perform).toHaveBeenCalledWith({ token: 'any_token' })
    expect(facebookAuth.perform).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if authentication fails', async () => {
    facebookAuth.perform.mockResolvedValueOnce(new AuthenticationError())
    const response = await sut.handle({ token: 'any_token' })

    expect(response).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if authentication succeds', async () => {
    const response = await sut.handle({ token: 'any_token' })

    expect(response).toEqual({
      statusCode: 200,
      data: {
        accessToken: 'any_value'
      }
    })
  })

  it('should return 500 if authentication throws', async () => {
    const error = new Error('infra_error')
    facebookAuth.perform.mockRejectedValueOnce(error)
    const response = await sut.handle({ token: 'any_token' })

    expect(response).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })
})
