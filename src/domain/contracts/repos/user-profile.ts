
export interface SaveUserPictureRepository {
  savePicture: (input: SaveUserPictureRepository.Input) => Promise<void>
}

export namespace SaveUserPictureRepository {
  export type Input = { pictureUrl?: string }
}

export interface LoadUserProfileRepository {
  load: (input: LoadUserProfileRepository.Input) => Promise<void>
}

export namespace LoadUserProfileRepository {
  export type Input = { id: string }
}
