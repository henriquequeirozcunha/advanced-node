export interface TokenGenerator {
  generateToken: (params: TokenGenerator.Params) => Promise<TokenGenerator.Result>
}

namespace TokenGenerator {
  export type Params = {
    key: string
  }

  export type Result = string
}
