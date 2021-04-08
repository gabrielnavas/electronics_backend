import {
  ClientInsertOneRepository, ClientParam, Result
} from '../../protocols/client-insert-one-repository'

const clientCreateOne =
  (clientInsertOneRepository: ClientInsertOneRepository) =>
    async (client: ClientParam): Result => ({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      id: '1'
    })

export { clientCreateOne }
