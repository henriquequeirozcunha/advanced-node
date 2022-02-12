export const env = {
  facebookApi: {
    clientId: process.env.FACEBOOK_CLIENT_ID ?? '965047794179833',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? 'bf97ea81591852e556ce5523cda81046'
  },
  appPort: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? 'oijawoidja123'
}
