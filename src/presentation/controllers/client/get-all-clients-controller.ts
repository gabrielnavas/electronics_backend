import { Request, Response } from 'express'
import { Client } from '../../../domain/models/client'
import { getAll as getAllUseCase } from '../../../domain/usecase/clients/get-all'
import { getAllClientsPostgres } from '../../../infra/database/postgres_business/repositories/clients/get-all'

const removePassword = (clients: Client[]) => {
  const clientsLessPassword = clients.map(client => {
    const { password, ...rest } = client
    return rest
  })
  return clientsLessPassword
}

const getAllClientsController = async (req: Request, res: Response) => {
  const clients = await getAllUseCase(getAllClientsPostgres)()
  res.status(200).json(removePassword(clients))
}

export { getAllClientsController }
