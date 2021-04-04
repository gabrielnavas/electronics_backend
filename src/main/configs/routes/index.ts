import { Express } from 'express'

import { router as routerClient } from '../../../routes/cliente-route'

const setupRoutes = (app: Express) => {
  app.use('/api/client', routerClient)
}

export default setupRoutes
