import { Client } from '../../../../src/domain/models/client'
import { getAll } from '../../../../src/domain/usecase/clients/get-all'
import { client } from '../../../../src/infra/database/postgres_business/connection'

describe('getAll UseCase', () => {
  test('should call clienteGetAllRepository', async () => {
    const clientGetAllRepositorySpyFn = jest.fn()
    const sut = await getAll(clientGetAllRepositorySpyFn)
    await sut()
    expect(clientGetAllRepositorySpyFn).toBeCalledTimes(1)
  })
})
