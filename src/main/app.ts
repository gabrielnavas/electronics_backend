import express from 'express'
import configMiddlewares from './configs/middlewares'
import configRoutes from './configs/routes'

const app = express()

configMiddlewares(app)
configRoutes(app)

export default app
