import { Client } from '../../../../../domain/models/client'
import {
  ClientGetAllWithFiltersRepository,
  ClientParam
} from '../../../../../domain/protocols/client/client-get-all-with-filters-repository'

import { client as clientConnection } from '../../connection'

export const getAllClientsWithFiltersPostgres: ClientGetAllWithFiltersRepository =
  async (client: ClientParam): Promise<Client[]> => {
    const sql = `
    SELECT 
      id, name, email, password
    FROM 
      eletronics_navas.client
    WHERE 
      name LIKE $1 or
      email LIKE $2;
    `
    const params = [`%${client.name}%`, `%${client.email}%`]
    const clients = await clientConnection.query<Client[]>(sql, params)
    return Promise.resolve(clients)
  }
