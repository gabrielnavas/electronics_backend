import { Request, Response } from 'express'
import { getAll } from '../../../domain/usecase/clients/get-all'
import { getAllClientsPostgres } from '../../../infra/database/postgres_business/repositories/clients/get-all'

const getAllClientsController = async (req: Request, res: Response) => {
  const clients = await getAll(getAllClientsPostgres)()

  res.status(200).json(clients)
}

export { getAllClientsController }
