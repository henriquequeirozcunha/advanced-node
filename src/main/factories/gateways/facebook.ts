import { FacebookApi } from '@/infra/gateways'
import { env } from '@/main/config/env'
import { makeAxiosHttpClient } from '@/main/factories/gateways'

export const makeFacebooApi = (): FacebookApi => {
  return new FacebookApi(
    makeAxiosHttpClient(),
    env.facebookApi.clientId,
    env.facebookApi.clientSecret
  )
}
