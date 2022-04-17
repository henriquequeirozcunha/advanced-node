import { DeleteProfilePictureController } from '@/application/controllers'
import { makeChangeProfilePicture } from '@/main/factories/services'

export const makeDeleteProfilePictureController = (): DeleteProfilePictureController => {
  return new DeleteProfilePictureController(makeChangeProfilePicture())
}
