import { UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'
import { SaveUserPictureRepository, LoadUserProfileRepository } from '@/domain/contracts/repos'

type Setup = (fileStorage: UploadFile, crypto: UUIDGenerator, userProfileRepo: SaveUserPictureRepository & LoadUserProfileRepository) => ChangeProfilePicture
type Input = { userId: string, file?: Buffer }
export type ChangeProfilePicture = (input: Input) => Promise<void>

export const setupChangeProfilePicture: Setup = (fileStorage, crypto, userProfileRepo) => async ({ userId, file }) => {
  let pictureUrl: string | undefined
  let initials: string | undefined

  if (file !== undefined) {
    pictureUrl = await fileStorage.upload({ file, key: crypto.uuid({ key: userId }) })
  } else {
    const { name } = await userProfileRepo.load({ id: userId })

    if (name !== undefined) {
      const firstLetters = name.match(/\b(.)/g) ?? []

      if (firstLetters.length > 1) {
        initials = `${firstLetters.shift()?.toUpperCase() ?? ''}${firstLetters.pop()?.toUpperCase() ?? ''}`
      } else {
        initials = name.substring(0, 2).toUpperCase()
      }
    }
  }

  await userProfileRepo.savePicture({ pictureUrl, initials })
}
