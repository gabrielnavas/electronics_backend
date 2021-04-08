import { Client } from '../../models/client'
import { ClientGetAllRepository } from '../../protocols/client/client-get-all-repository'

type Result = Promise<Client[]>

const getAll = (clientGetAllRepository: ClientGetAllRepository) =>
  ():Result => {
    return clientGetAllRepository()
  }

export { getAll }
