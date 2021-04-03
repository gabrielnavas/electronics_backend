import { Client } from '../../../../src/domain/models/client'
import { getAll } from '../../../../src/domain/usecase/clients/get-all'

describe('getAll UseCase', () => {
  test('should call clienteGetAllRepository', async () => {
    const clientGetAllRepositorySpyFn = jest.fn()
    const sut = await getAll(clientGetAllRepositorySpyFn)
    await sut()
    expect(clientGetAllRepositorySpyFn).toBeCalledTimes(1)
  })

  test('should return many clients', async () => {
    const clients = [{
      id: 'any_id1',
      name: 'any_name1',
      email: 'any_email1@email.com',
      password: 'any_password1'
    }, {
      id: 'any_id2',
      name: 'any_name2',
      email: 'any_email2@email.com',
      password: 'any_password2'
    }]
    const clientRepository = async (): Promise<Client[]> => {
      return [...clients]
    }
    const sut = await getAll(clientRepository)
    const clientsResult = await sut()
    expect(clientsResult).toEqual(clients)
  })

  test('should throws if clientGetAllRepository throws', async () => {
    const clientGetAllRepositorySpyFn = jest.fn().mockRejectedValueOnce(new Error())
    const sut = await getAll(clientGetAllRepositorySpyFn)
    const promise = sut()
    expect(promise).rejects.toThrow()
  })
})
