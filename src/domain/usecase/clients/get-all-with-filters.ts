import { Client } from '../../models/client'
import { ClientGetAllWithFiltersRepository, ClientParam } from '../../protocols/client/client-get-all-with-filters-repository'

type Result = Promise<Client[]>

const clientGetAllWithFilters = (clientGetAllWithFiltersRepository: ClientGetAllWithFiltersRepository) =>
  (client: ClientParam): Result => {
    return clientGetAllWithFiltersRepository(client)
  }

export { clientGetAllWithFilters }
