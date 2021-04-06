import { Router } from 'express'

import {
  createClientController,
  deleteClientController,
  getAllClientsController,
  getAllClientsWithFiltersController,
  getClientController
} from '../../presentation/controllers/client'

const router = Router()

router.get('/', getAllClientsController)
router.get('/filters', getAllClientsWithFiltersController)
router.get('/:id', getClientController)
router.post('/', createClientController)
router.delete('/', deleteClientController)

export { router }
