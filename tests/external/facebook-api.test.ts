import { FacebookApi } from '@/infra/apis/facebook'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('Facebook Api integration Tests', () => {
  it('Should return a facebook user if token is valid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret)

    const fbUser = await sut.loadUser({ token: 'EAANttLL2nvkBANOpNCYrjrSxdpnkrHObc6NZCIfrY6pDXgARjd9qkZCqw9ZB2ZCfJJPCmNqI0QkNzZC57ZAVZAZBIblM5f5VWBHq3yqaGnhm7NrbJpmk2dIiywksbUeUBAZBM5DNx6Ma6U2X7ZCZA5jxjjsN41Td94l3SNhMQsT5OggEdD0sDA15TSkYnrDJZCdzoBFaCjK2pC3KzRu4Lh9kZBY6O' })

    expect(fbUser).toEqual({
      facebookId: '105616418718443',
      name: 'Henrique Teste',
      email: 'henrique_eujrktw_teste@tfbnw.net'
    })
  })

  it('Should return a undefined if token is inValid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret)

    const fbUser = await sut.loadUser({ token: 'invalid_token' })

    expect(fbUser).toBeUndefined()
  })
})
