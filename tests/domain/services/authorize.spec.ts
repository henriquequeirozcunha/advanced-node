
import { TokenValidator } from '@/domain/contracts/crypto'
import { Authorize, setupAuthorize } from '@/domain/services'

import { mock, MockProxy } from 'jest-mock-extended'

describe('Authorize', () => {
  const token = 'any_token'
  let crypto: MockProxy<TokenValidator>
  let sut: Authorize

  beforeAll(() => {
    crypto = mock()
    crypto.validateToken.mockResolvedValue('any_value')
  })

  beforeEach(() => {
    sut = setupAuthorize(crypto)
  })

  it('should call TokenValidator with correct params', async () => {
    await sut({ token })

    expect(crypto.validateToken).toHaveBeenCalledWith({ token })
    expect(crypto.validateToken).toHaveBeenCalledTimes(1)
  })

  it('should return correct accessToken', async () => {
    const userId = await sut({ token })

    expect(userId).toBe('any_value')
  })
})
