class FacebookLoginController {
  async handle (httpRequest: any): Promise<HttpResponse> {
    return {
      statusCode: 400,
      data: new Error('The field token is required')
    }
  }
}

type HttpResponse = {
  statusCode: number
  data: any
}

describe('FacebookLoginController', () => {
  it('should return 400 if token is empty', async () => {
    const sut = new FacebookLoginController()

    const response = await sut.handle({ token: '' })

    expect(response).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })

  it('should return 400 if token is null', async () => {
    const sut = new FacebookLoginController()

    const response = await sut.handle({ token: null })

    expect(response).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })

  it('should return 400 if token is undefined', async () => {
    const sut = new FacebookLoginController()

    const response = await sut.handle({ token: undefined })

    expect(response).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })
})
