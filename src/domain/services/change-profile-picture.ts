import { DeleteFile, UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'
import { SaveUserPictureRepository, LoadUserProfileRepository } from '@/domain/contracts/repos'
import { UserProfile } from '@/domain/models'

type Setup = (fileStorage: UploadFile & DeleteFile, crypto: UUIDGenerator, userProfileRepo: SaveUserPictureRepository & LoadUserProfileRepository) => ChangeProfilePicture
type Input = { userId: string, file?: Buffer }
type Output = { pictureUrl?: string, initials?: string }
export type ChangeProfilePicture = (input: Input) => Promise<Output>

export const setupChangeProfilePicture: Setup = (fileStorage, crypto, userProfileRepo) => async ({ userId, file }) => {
  const key = crypto.uuid({ key: userId })
  const data: { pictureUrl?: string, name?: string } = {}

  if (file !== undefined) {
    data.pictureUrl = await fileStorage.upload({ file, key })
  } else {
    data.name = (await userProfileRepo.load({ id: userId })).name
  }

  const userProfile = new UserProfile(userId)

  userProfile.setPicture(data)

  try {
    await userProfileRepo.savePicture(userProfile)
  } catch {
    await fileStorage.delete({ key })
  }

  return userProfile
}
