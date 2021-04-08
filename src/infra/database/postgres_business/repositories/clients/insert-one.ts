import { ClientInsertOneRepository, ClientParam, Result } from '../../../../../domain/protocols/client-insert-one-repository'

export const insertOneClientPostgres: ClientInsertOneRepository =
  async (client: ClientParam): Result => ({ ...client, id: '1' })
