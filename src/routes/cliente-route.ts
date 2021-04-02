import { Router } from 'express'

import {
  createClientController,
  deleteClientController,
  getAllClientsController,
  getClientController
} from '../presentation/controllers/client'

const router = Router()

router.get('/', getAllClientsController)
router.get('/:id', getClientController)
router.post('/', createClientController)
router.delete('/', deleteClientController)

export { router }
