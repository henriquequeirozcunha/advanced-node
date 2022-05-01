import { setupFacebookAuthentication, FacebookAuthentication } from '@/domain/services'
import { makeFacebooApi, makeJwtTokenHandler } from '@/main/factories/gateways'
import { makePgUserAccountRepo } from '@/main/factories/repos'

export const makeFacebookAuthenticationService = (): FacebookAuthentication => {
  return setupFacebookAuthentication(
    makeFacebooApi(),
    makePgUserAccountRepo(),
    makeJwtTokenHandler())
}
