export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '',
    clientSecret: process.env.FB_CLIENT_SECRET ?? ''
  },
  appPort: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? 'oijawoidja123'
}
