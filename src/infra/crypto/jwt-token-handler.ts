import { TokenGenerator, TokenValidator } from '@/domain/contracts/crypto'
import { sign, verify } from 'jsonwebtoken'

export class JwtTokenHandler implements TokenGenerator {
  constructor (private readonly secret: string) {}

  async generateToken (params: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    const expirationInSeconds = params.expirationInMs / 1000
    return sign({ key: params.key }, this.secret, { expiresIn: expirationInSeconds })
  }

  async validateToken ({ token }: TokenValidator.Params): Promise<void> {
    verify(token, this.secret)
  }
}
