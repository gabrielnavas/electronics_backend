import express, { Express } from 'express'
import cors from 'cors'

const setupMiddlewares = (app: Express) => {
  app.use(cors())
  app.use(express.json())
}

export default setupMiddlewares
