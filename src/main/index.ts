import './config/module-alias'
import { env } from '@/main/config/env'

import 'reflect-metadata'
import { createConnection, getConnectionOptions } from 'typeorm'

getConnectionOptions().then(async options => {
  const root = process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'
  const entities = [`${root}/infra/repos/postgres/entities/index.{js,ts}`]
  await createConnection({ ...options, entities })

  const { app } = await import('@/main/config/app')

  app.listen(env.appPort, () => console.log(`Server running at http://localhost:${env.appPort}`))
}).catch(console.error)
