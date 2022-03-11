import { setupFacebookAuthentication, FacebookAuthentication } from '@/domain/services'
import { makeFacebooApi } from '@/main/factories/gateways'
import { makePgUserAccountRepo } from '@/main/factories/repos'
import { makeJwtTokenHandler } from '@/main/factories/crypto'

export const makeFacebookAuthenticationService = (): FacebookAuthentication => {
  return setupFacebookAuthentication(
    makeFacebooApi(),
    makePgUserAccountRepo(),
    makeJwtTokenHandler())
}
