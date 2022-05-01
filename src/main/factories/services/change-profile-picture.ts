import { setupChangeProfilePicture, ChangeProfilePicture } from '@/domain/services'
import { makeAwsS3FileStorage, makeUUIDHandler } from '../gateways'
import { makePgUserProfileRepo } from '../repos'

export const makeChangeProfilePicture = (): ChangeProfilePicture => {
  return setupChangeProfilePicture(
    makeAwsS3FileStorage(),
    makeUUIDHandler(),
    makePgUserProfileRepo()
  )
}
