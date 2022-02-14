import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'kesavan.db.elephantsql.com',
  port: 5432,
  username: 'biotcwlu',
  database: 'biotcwlu',
  password: 'h_qDfnkW7hj2cMEkF-pxc08TnFZn-N67',
  entities: ['dist/infra/postgres/entities/index.js']
}
