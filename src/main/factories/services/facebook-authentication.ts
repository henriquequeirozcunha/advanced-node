import { setupFacebookAuthentication, FacebookAuthentication } from '@/domain/services'
import { makeFacebooApi } from '@/main/factories/apis'
import { makePgUserAccountRepo } from '@/main/factories/repos'
import { makeJwtTokenGenerator } from '@/main/factories/crypto'

export const makeFacebookAuthenticationService = (): FacebookAuthentication => {
  return setupFacebookAuthentication(
    makeFacebooApi(),
    makePgUserAccountRepo(),
    makeJwtTokenGenerator())
}
