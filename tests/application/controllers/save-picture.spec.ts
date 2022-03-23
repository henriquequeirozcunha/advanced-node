import { RequiredFieldError } from '@/application/errors'
import { badRequest, HttpResponse } from '@/application/helpers'

type HttpRequest = { file: { buffer: Buffer } }
type Model = Error

class SaveProfilePictureController {
  async handle ({ file }: HttpRequest): Promise<HttpResponse<Model>> {
    return badRequest(new RequiredFieldError('file'))
  }
}

describe('SaveProfilePictureController', () => {
  let sut: SaveProfilePictureController

  beforeEach(() => {
    sut = new SaveProfilePictureController()
  })

  it('should return 400 if file is not provided', async () => {
    const httpResponse = await sut.handle({ file: undefined as any })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('file')
    })
  })

  it('should return 400 if file is not null', async () => {
    const httpResponse = await sut.handle({ file: null as any })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('file')
    })
  })

  it('should return 400 if file is not empty', async () => {
    const httpResponse = await sut.handle({ file: { buffer: Buffer.from('') } })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('file')
    })
  })
})
