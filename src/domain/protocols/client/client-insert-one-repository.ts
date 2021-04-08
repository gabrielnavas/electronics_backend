import { Client } from '../../models/client'

export type ClientParam = Omit<Client, 'id'>
export type Result = Promise<Client>
export type ClientInsertOneRepository = (client: ClientParam) => Result
