import { Client } from '../../../../src/domain/models/client'
import { clientGetAllWithFilters } from '../../../../src/domain/usecase/clients/get-all-with-filters'

describe('clientGetAllWithFilters UseCase', () => {
  test('should call clientGetAllWithFiltersRepository', async () => {
    const clientGetAllWithFiltersRepositoryFn = jest.fn()
    const sut = await clientGetAllWithFilters(clientGetAllWithFiltersRepositoryFn)
    const client = {
      name: 'any_name',
      email: 'any_email'
    }
    await sut(client)
    expect(clientGetAllWithFiltersRepositoryFn).toBeCalledTimes(1)
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
    const clientGetAllWithFiltersRepository = async (): Promise<Client[]> => {
      return [...clients]
    }
    const sut = await clientGetAllWithFilters(clientGetAllWithFiltersRepository)
    const client = {
      name: 'any_name1',
      email: 'any_email2'
    }
    const clientsResult = await sut(client)
    expect(clientsResult).toEqual(clients)
  })

  test('should throws if clientGetAllWithFiltersRepository throws', async () => {
    const clientGetAllWithFiltersRepositoryFn = jest.fn().mockRejectedValueOnce(new Error())
    const sut = await clientGetAllWithFilters(clientGetAllWithFiltersRepositoryFn)
    const client = {
      name: 'any_name',
      email: 'any_email'
    }
    const promise = sut(client)
    expect(promise).rejects.toThrow()
  })
})
