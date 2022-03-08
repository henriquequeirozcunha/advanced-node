import { UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'
import { SaveUserPictureRepository, LoadUserProfileRepository } from '@/domain/contracts/repos'

type Setup = (fileStorage: UploadFile, crypto: UUIDGenerator, userProfileRepo: SaveUserPictureRepository & LoadUserProfileRepository) => ChangeProfilePicture
type Input = { userId: string, file?: Buffer }
export type ChangeProfilePicture = (input: Input) => Promise<void>

export const setupChangeProfilePicture: Setup = (fileStorage, crypto, userProfileRepo) => async ({ userId, file }) => {
  let pictureUrl: string | undefined

  if (file !== undefined) {
    pictureUrl = await fileStorage.upload({ file, key: crypto.uuid({ key: userId }) })
  }

  await userProfileRepo.savePicture({ pictureUrl })
  await userProfileRepo.load({ id: userId })
}
