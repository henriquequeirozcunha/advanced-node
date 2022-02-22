import { AccessToken } from '@/domain/models'

describe('AcessToken', () => {
  it('should expire in 1800000 ms', () => {
    expect(AccessToken.expirationInMs).toBe(1800000)
  })
})
