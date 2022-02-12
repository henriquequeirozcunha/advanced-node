import express from 'express'
import { setupMiddewares } from '@/main/config/middlewares'
import { setupRoutes } from '@/main/config/routes'

const app = express()
setupMiddewares(app)
setupRoutes(app)

export { app }
