import { SaveProfilePictureController } from '@/application/controllers'
import { makeChangeProfilePicture } from '@/main/factories/services'

export const makeSaveProfilePictureController = (): SaveProfilePictureController => {
  return new SaveProfilePictureController(makeChangeProfilePicture())
}
