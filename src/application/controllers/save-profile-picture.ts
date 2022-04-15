
import { HttpResponse, ok } from '@/application/helpers'
import { ChangeProfilePicture } from '@/domain/services'
import { Validator, ValidationBuilder as Builder } from '@/application/validation'
import { Controller } from './controller'

type HttpRequest = { file: { buffer: Buffer, mimeType: string }, userId: string }
type Model = Error | { initials?: string, pictureUrl?: string }

export class SaveProfilePictureController extends Controller {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {
    super()
  }

  override async perform ({ file, userId }: HttpRequest): Promise<HttpResponse<Model>> {
    const data = await this.changeProfilePicture({ userId, file: file.buffer })

    return ok(data)
  }

  override buildValidators ({ file }: HttpRequest): Validator[] {
    return ([
      ...Builder.of({ value: file, fieldName: 'file' })
        .required()
        .image({ allowed: ['png', 'jpg'], maxSizeInMb: 5 })
        .build()
    ])
  }
}
