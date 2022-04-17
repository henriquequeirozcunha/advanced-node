import './config/module-alias'
import { env } from '@/main/config/env'

import 'reflect-metadata'
import { createConnection } from 'typeorm'

createConnection()
  .then(async () => {
    const { app } = await import('@/main/config/app')

    app.listen(env.appPort, () => console.log(`Server running at http://localhost:${env.appPort}`))
  }).catch(console.error)
