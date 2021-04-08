import {
  ClientInsertOneRepository,
  ClientParam,
  Result
} from '../../protocols/client/client-insert-one-repository'

const clientCreateOne = (
  clientInsertOneRepository: ClientInsertOneRepository
) =>
  async (client: ClientParam): Result => {
    await clientInsertOneRepository(client)
    return {
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      id: '1'
    }
  }
export { clientCreateOne }
