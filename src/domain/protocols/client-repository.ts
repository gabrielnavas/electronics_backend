import { Client } from '../models/client'

export interface ClientGetAllRepository {
  (): Promise<Client[]>
}
