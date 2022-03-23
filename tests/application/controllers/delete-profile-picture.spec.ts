import { ChangeProfilePicture } from '@/domain/services'

type HttpRequest = { userId: string }

class DeleteProfilePictureController {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {}

  async handle ({ userId }: HttpRequest): Promise<void> {
    await this.changeProfilePicture({ userId })
  }
}

describe('DeleteProfilePictureController', () => {
  let changeProfilePicture: jest.Mock
  let sut: DeleteProfilePictureController

  beforeAll(() => {
    changeProfilePicture = jest.fn()
  })

  beforeEach(() => {
    sut = new DeleteProfilePictureController(changeProfilePicture)
  })

  it('should call ChangeProfilePicture with correct input', async () => {
    await sut.handle({ userId: 'any_user_id' })

    expect(changeProfilePicture).toHaveBeenCalledWith({ userId: 'any_user_id', file: undefined })
    expect(changeProfilePicture).toHaveBeenCalledTimes(1)
  })
})
