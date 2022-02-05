import { FacebookAccount } from '@/domain/models'

describe('FacebookAccount', () => {
  const fbData = {
    name: 'any_facebook_name',
    email: 'any_facebook_email',
    facebookId: 'any_facebook_id'
  }
  it('should create with facebook data only', () => {
    const sut = new FacebookAccount(fbData)

    expect(sut).toEqual(fbData)
  })

  it('should update name it is empty', () => {
    const accountData = {
      id: 'any_id'
    }
    const sut = new FacebookAccount(fbData, accountData)

    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_facebook_name',
      email: 'any_facebook_email',
      facebookId: 'any_facebook_id'
    })
  })

  it('should not update name it is not empty', () => {
    const accountData = {
      id: 'any_id',
      name: 'any_name'
    }
    const sut = new FacebookAccount(fbData, accountData)

    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_facebook_email',
      facebookId: 'any_facebook_id'
    })
  })
})
