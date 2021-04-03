import { Client } from '../models/client'

export type ClientParam = Omit<Client, 'id' | 'password'>

export type ClientGetAllWithFiltersRepository =
  (client: ClientParam) => Promise<Client[]>
