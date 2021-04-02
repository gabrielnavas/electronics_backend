import express from 'express'
import setupRoutes from './configs/routes'

const app = express()
setupRoutes(app)

export default app
