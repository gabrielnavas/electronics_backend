import pgp, { IInitOptions } from 'pg-promise'
import env from '../../../main/configs/env'

const options: IInitOptions = {}
const pgpMain = pgp(options)

const client = pgpMain({
  host: env.database.postgres_business.host,
  port: env.database.postgres_business.port,
  user: env.database.postgres_business.user,
  password: env.database.postgres_business.password,
  database: env.database.postgres_business.database
})

export { client }
