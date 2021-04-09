import {
  Request,
  Response
} from 'express'
import {
  Client
} from '../../../domain/models/client'
import {
  ClientParam
} from '../../../domain/protocols/client/client-get-all-with-filters-repository'
import {
  clientGetAllWithFilters as clientGetAllWithFiltersUseCase
} from '../../../domain/usecase/clients/get-all-with-filters'
import {
  getAllClientsWithFiltersPostgres
}
  from '../../../infra/database/postgres_business/repositories/clients/get-all-with-filters'

const removePassword = (clients: Client[]) => {
  const clientsLessPassword = clients.map(client => {
    const { password, ...rest } = client
    return rest
  })
  return clientsLessPassword
}

const getQueries = (req: Request): ClientParam | Error => {
  const requerimentsQueries = ['name', 'email']
  for (const attribute of requerimentsQueries) {
    if (!req.query[attribute]) {
      return new Error(`missing query param: ${attribute}`)
    }
  }
  return {
    name: (<string>req.query.name).toString(),
    email: (<string>req.query.email).toString()
  } as ClientParam
}

const getAllClientsWithFiltersController = async (req: Request, res: Response) => {
  try {
    const queries: ClientParam | Error = getQueries(req)
    if (queries instanceof Error) {
      return res.status(400).json(queries)
    }
    const clients = await clientGetAllWithFiltersUseCase(getAllClientsWithFiltersPostgres)(queries)
    res.status(200).json(removePassword(clients))
  } catch (error) {
    res.status(500).json()
  }
}

export { getAllClientsWithFiltersController }
