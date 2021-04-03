import { ClientGetAllRepository } from '../../../../../domain/protocols/client-repository'
import { Client } from '../../../../../domain/models/client'

import { client as clientConnection } from '../../connection'

export const getAllClientsPostgres: ClientGetAllRepository = async (): Promise<Client[]> => {
  const sql = `
    SELECT id, name, email, password
    FROM eletronics_navas.client;
  `
  const clients = await clientConnection.query<Client[]>(sql)

  return Promise.resolve(clients)
}
