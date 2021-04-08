import {
  ClientInsertOneRepository,
  ClientParam,
  Result
} from '../../protocols/client/client-insert-one-repository'

const clientCreateOne = (
  clientInsertOneRepository: ClientInsertOneRepository
) =>
  async (client: ClientParam): Result => {
    return await clientInsertOneRepository(client)
  }
export { clientCreateOne }
