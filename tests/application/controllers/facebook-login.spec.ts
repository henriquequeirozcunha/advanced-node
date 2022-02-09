import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { FacebookLoginController } from '@/application/controllers'
import { ServerError, UnauthorizedError } from '@/application/errors'
import { RequiredStringValidator, ValidationComposite } from '@/application/validation'

import { mock, MockProxy } from 'jest-mock-extended'
import { mocked } from 'ts-jest/utils'

jest.mock('@/application/validation/composite')

describe('FacebookLoginController', () => {
  let sut: FacebookLoginController
  let facebookAuth: MockProxy<FacebookAuthentication>
  let token: string

  beforeAll(() => {
    token = 'any_token'
    facebookAuth = mock<FacebookAuthentication>()
    facebookAuth.perform.mockResolvedValue(new AccessToken('any_value'))
  })

  beforeEach(() => {
    sut = new FacebookLoginController(facebookAuth)
  })

  it('should return 400 if validation fails', async () => {
    const error = new Error('validation_error')
    const ValidationCompositeSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error)
    }))
    mocked(ValidationComposite).mockImplementationOnce(ValidationCompositeSpy)

    const response = await sut.handle({ token })

    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredStringValidator('any_token', 'token')
    ])

    expect(response).toEqual({
      statusCode: 400,
      data: error
    })
  })

  it('should call FacebookAuthentication with correct params', async () => {
    await sut.handle({ token })

    expect(facebookAuth.perform).toHaveBeenCalledWith({ token })
    expect(facebookAuth.perform).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if authentication fails', async () => {
    facebookAuth.perform.mockResolvedValueOnce(new AuthenticationError())
    const response = await sut.handle({ token })

    expect(response).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if authentication succeds', async () => {
    const response = await sut.handle({ token })

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
    const response = await sut.handle({ token })

    expect(response).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })
})
