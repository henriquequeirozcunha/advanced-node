import { LoadFacebookUser, TokenGenerator } from '@/domain/contracts/gateways'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/domain/contracts/repos'
import { AuthenticationError } from '@/domain/errors'
import { AccessToken, FacebookAccount } from '@/domain/models'

type Setup = (
  facebookApi: LoadFacebookUser,
  userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository,
  crypto: TokenGenerator
) => FacebookAuthentication

type Input = { token: string }
type Output = { accessToken: string }

export type FacebookAuthentication = (params: Input) => Promise<Output>

export const setupFacebookAuthentication: Setup = (facebookApi, userAccountRepo, crypto) => async params => {
  const fbData = await facebookApi.loadUser(params)

  if (fbData !== undefined) {
    const accountData = await userAccountRepo.load({ email: fbData.email })
    const fbAccount = new FacebookAccount(fbData, accountData)
    const { id } = await userAccountRepo.saveWithFacebook(fbAccount)
    const accessToken = await crypto.generateToken({ key: id, expirationInMs: AccessToken.expirationInMs })

    return { accessToken }
  }

  throw new AuthenticationError()
}
