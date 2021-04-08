import { Client } from '../../../../../domain/models/client'
import {
  ClientInsertOneRepository,
  ClientParam,
  Result
} from '../../../../../domain/protocols/client/client-insert-one-repository'

import { client as clientConnection } from '../../connection'

export const insertOneClientPostgres: ClientInsertOneRepository =
  async (client: ClientParam): Result => {
    const sql = `
      INSERT INTO eletronics_navas.client 
        (name, email, password)
      VALUES  
        ($1, $2 ,$3)
      RETURNING 
        id, name, email, password;
    `
    const params = [
      client.name,
      client.email,
      client.password
    ]
    const clientQuery = await clientConnection.one<Client>(sql, params)
    return clientQuery
  }
