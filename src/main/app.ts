import express from 'express'
import setupMiddlewares from './configs/middlewares'
import setupRoutes from './configs/routes'

const app = express()

setupMiddlewares(app)
setupRoutes(app)

export default app
