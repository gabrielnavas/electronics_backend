import { Express } from 'express'
import cors from 'cors'

const setupMiddlewares = (app: Express) => {
  app.use(cors())
}

export default setupMiddlewares
