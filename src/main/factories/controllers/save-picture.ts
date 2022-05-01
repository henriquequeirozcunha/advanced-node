import { SaveProfilePictureController, Controller } from '@/application/controllers'
import { makeChangeProfilePicture } from '@/main/factories/services'
import { makePgTransactionController } from '@/main/factories/decorators'

export const makeSaveProfilePictureController = (): Controller => {
  const controller = new SaveProfilePictureController(makeChangeProfilePicture())

  return makePgTransactionController(controller)
}
