import { Controller } from '@/application/controllers'
import { ChangeProfilePicture } from '@/domain/services'
import { HttpResponse, noContent } from '@/application/helpers'

type HttpRequest = { userId: string }

export class DeleteProfilePictureController extends Controller {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {
    super()
  }

  async perform ({ userId }: HttpRequest): Promise<HttpResponse> {
    await this.changeProfilePicture({ userId })

    return noContent()
  }
}
