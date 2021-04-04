import './dotenv'
import * as helpers from './helpers'

export default {
  server: {
    port: helpers.isDevOrTestEnv() ? 3050 : process.env.PORT
  },

  database: {
    postgres_business: {
      host: helpers.isDevOrTestEnv() ? 'localhost' : process.env.POSTGRES_HOST,
      port: helpers.isDevOrTestEnv() ? 5432 : Number(process.env.POSTGRES_PORT),
      user: helpers.isDevOrTestEnv() ? 'postgres' : process.env.POSTGRES_USER,
      password: helpers.isDevOrTestEnv() ? '123' : process.env.PASSWORD,
      database: helpers.isDevOrTestEnv() ? 'postgres' : process.env.DATABASE
    }
  }
}
