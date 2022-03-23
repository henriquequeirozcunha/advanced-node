import { ChangeProfilePicture } from '@/domain/services'

type HttpRequest = { userId: string }

class DeleteProfilePictureController {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {}

  async handle ({ userId }: HttpRequest): Promise<void> {
    await this.changeProfilePicture({ userId })
  }
}

describe('DeleteProfilePictureController', () => {
  it('should call ChangeProfilePicture with correct input', async () => {
    const changeProfilePicture = jest.fn()
    const sut = new DeleteProfilePictureController(changeProfilePicture)

    await sut.handle({ userId: 'any_user_id' })

    expect(changeProfilePicture).toHaveBeenCalledWith({ userId: 'any_user_id', file: undefined })
    expect(changeProfilePicture).toHaveBeenCalledTimes(1)
  })
})
