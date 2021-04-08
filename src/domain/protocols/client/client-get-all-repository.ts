import { Client } from '../../models/client'

export type ClientGetAllRepository = () => Promise<Client[]>
