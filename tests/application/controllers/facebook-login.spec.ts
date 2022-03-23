import { AuthenticationError } from '@/domain/errors'
import { Controller, FacebookLoginController } from '@/application/controllers'
import { UnauthorizedError } from '@/application/errors'
import { RequiredStringValidator } from '@/application/validation'

jest.mock('@/application/validation/composite')

describe('FacebookLoginController', () => {
  let sut: FacebookLoginController
  let facebookAuth: jest.Mock
  let token: string

  beforeAll(() => {
    token = 'any_token'
    facebookAuth = jest.fn()
    facebookAuth.mockResolvedValue({ accessToken: 'any_value' })
  })

  beforeEach(() => {
    sut = new FacebookLoginController(facebookAuth)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should return build Validators corretly', async () => {
    const validators = await sut.buildValidators({ token })

    expect(validators).toEqual([
      new RequiredStringValidator('any_token', 'token')
    ])
  })

  it('should call FacebookAuthentication with correct params', async () => {
    await sut.handle({ token })

    expect(facebookAuth).toHaveBeenCalledWith({ token })
    expect(facebookAuth).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if authentication fails', async () => {
    facebookAuth.mockRejectedValueOnce(new AuthenticationError())

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
})
