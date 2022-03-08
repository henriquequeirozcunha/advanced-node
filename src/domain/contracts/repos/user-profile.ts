
export interface SaveUserPictureRepository {
  savePicture: (input: SaveUserPictureRepository.Input) => Promise<void>
}

export namespace SaveUserPictureRepository {
  export type Input = { pictureUrl?: string, initials?: string }
}

export interface LoadUserProfileRepository {
  load: (input: LoadUserProfileRepository.Input) => Promise<LoadUserProfileRepository.Output>
}

export namespace LoadUserProfileRepository {
  export type Input = { id: string }
  export type Output = { name?: string }
}
