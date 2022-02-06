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
})
