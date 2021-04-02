import './dotenv'
import * as helpers from './helpers'

export default {
  server: {
    port: helpers.isDevOrTest() ? 3050 : process.env.PORT
  },

  database: {
    postgres_business: {
      host: helpers.isDevOrTest() ? 'localhost' : process.env.POSTGRES_HOST,
      port: helpers.isDevOrTest() ? 5432 : Number(process.env.PORT),
      user: helpers.isDevOrTest() ? 'postgres' : process.env.POSTGRES_USER,
      password: helpers.isDevOrTest() ? '123' : process.env.PASSWORD,
      database: helpers.isDevOrTest() ? 'postgres' : process.env.DATABASE
    }
  }
}
