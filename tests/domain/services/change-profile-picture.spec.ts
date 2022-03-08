import { UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'
import { ChangeProfilePicture, setupChangeProfilePicture } from '@/domain/services'
import { LoadUserProfileRepository, SaveUserPictureRepository } from '@/domain/contracts/repos'

import { mock, MockProxy } from 'jest-mock-extended'

describe('ChangeProfilePicture', () => {
  let uuid: string
  let file: Buffer | undefined
  let fileStorage: MockProxy<UploadFile>
  let crypto: MockProxy<UUIDGenerator>
  let userProfileRepo: MockProxy<SaveUserPictureRepository & LoadUserProfileRepository>
  let sut: ChangeProfilePicture

  beforeAll(() => {
    uuid = 'any_unique_id'
    file = Buffer.from('any_buffer')
    fileStorage = mock()
    fileStorage.upload.mockResolvedValue('any_url')
    crypto = mock()
    crypto.uuid.mockReturnValue(uuid)
    userProfileRepo = mock()
    userProfileRepo.load.mockResolvedValue({ name: 'Henrique Queiroz Cunha' })
  })

  beforeEach(() => {
    sut = setupChangeProfilePicture(fileStorage, crypto, userProfileRepo)
  })

  it('should call UploadFile with correct input', async () => {
    await sut({ userId: 'any_user_id', file })

    expect(fileStorage.upload).toHaveBeenCalledWith({ file, key: uuid })
    expect(fileStorage.upload).toHaveBeenCalledTimes(1)
  })

  it('should not call UploadFile when file is undefined', async () => {
    await sut({ userId: 'any_user_id', file: undefined })

    expect(fileStorage.upload).not.toHaveBeenCalled()
  })

  it('should call SaveUserPictureRepository with correct input', async () => {
    await sut({ userId: 'any_user_id', file })

    expect(userProfileRepo.savePicture).toHaveBeenCalledWith({ pictureUrl: 'any_url', initials: undefined })
    expect(userProfileRepo.savePicture).toHaveBeenCalledTimes(1)
  })

  it('should call SaveUserPictureRepository with correct input when file is undefined', async () => {
    await sut({ userId: 'any_user_id', file: undefined })

    expect(userProfileRepo.savePicture).toHaveBeenCalledWith({ pictureUrl: undefined, initials: 'HC' })
    expect(userProfileRepo.savePicture).toHaveBeenCalledTimes(1)
  })

  it('should call SaveUserPictureRepository with correct input when file is undefined', async () => {
    userProfileRepo.load.mockResolvedValueOnce({ name: 'henrique queiroz cunha' })

    await sut({ userId: 'any_user_id', file: undefined })

    expect(userProfileRepo.savePicture).toHaveBeenCalledWith({ pictureUrl: undefined, initials: 'HC' })
    expect(userProfileRepo.savePicture).toHaveBeenCalledTimes(1)
  })

  it('should call SaveUserPictureRepository with correct input when file is undefined', async () => {
    userProfileRepo.load.mockResolvedValueOnce({ name: 'henrique' })

    await sut({ userId: 'any_user_id', file: undefined })

    expect(userProfileRepo.savePicture).toHaveBeenCalledWith({ pictureUrl: undefined, initials: 'HE' })
    expect(userProfileRepo.savePicture).toHaveBeenCalledTimes(1)
  })

  it('should call SaveUserPictureRepository with correct input when file is undefined', async () => {
    userProfileRepo.load.mockResolvedValueOnce({ name: 'h' })

    await sut({ userId: 'any_user_id', file: undefined })

    expect(userProfileRepo.savePicture).toHaveBeenCalledWith({ pictureUrl: undefined, initials: 'H' })
    expect(userProfileRepo.savePicture).toHaveBeenCalledTimes(1)
  })

  it('should call SaveUserPictureRepository with correct input when file is undefined', async () => {
    userProfileRepo.load.mockResolvedValueOnce({ name: undefined })

    await sut({ userId: 'any_user_id', file: undefined })

    expect(userProfileRepo.savePicture).toHaveBeenCalledWith({ pictureUrl: undefined, initials: undefined })
    expect(userProfileRepo.savePicture).toHaveBeenCalledTimes(1)
  })

  it('should call LoadUserProfile with correct input', async () => {
    await sut({ userId: 'any_user_id', file: undefined })

    expect(userProfileRepo.load).toHaveBeenCalledWith({ id: 'any_user_id' })
    expect(userProfileRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should not call LoadUserProfile if file exists', async () => {
    await sut({ userId: 'any_user_id', file })

    expect(userProfileRepo.load).not.toHaveBeenCalled()
  })
})
