import { FacebookAuthenticationService } from '@/domain/services'
import { makeFacebooApi } from '@/main/factories/apis'
import { makePgUserAccountRepo } from '@/main/factories/repos'
import { makeJwtTokenGenerator } from '@/main/factories/crypto'

export const makeFacebookAuthenticationService = (): FacebookAuthenticationService => {
  return new FacebookAuthenticationService(
    makeFacebooApi(),
    makePgUserAccountRepo(),
    makeJwtTokenGenerator())
}
