import { HttpGetClient } from '@/infra/gateways'
import axios from 'axios'

export class AxiosHttpClient implements HttpGetClient {
  async get <T = any> ({ url, params }: HttpGetClient.Params): Promise<T> {
    const result = await axios.get(url, { params: params })

    return result.data
  }
}
