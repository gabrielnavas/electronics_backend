import { clientCreateOne } from '../../../../src/domain/usecase/clients/create-one'

describe('clientCreateOne useCase', () => {
  test('should call ClientInsertOneRepository with client', async () => {
    const clientInsertOneRepositorySpy = jest.fn()
    const sut = clientCreateOne(
      clientInsertOneRepositorySpy
    )
    const client = {
      email: 'any_email',
      name: 'any_name',
      password: 'any_password'
    }
    await sut(client)
    expect(clientInsertOneRepositorySpy).toHaveBeenCalledWith(client)
  })

  test('should throw if clientInsertOneRepository throws', async () => {
    const clientInsertOneRepositorySpy = jest.fn()
      .mockRejectedValue(new Error('any_error'))
    const sut = clientCreateOne(
      clientInsertOneRepositorySpy
    )
    const client = {
      email: 'any_email',
      name: 'any_name',
      password: 'any_password'
    }
    const promise = sut(client)
    expect(promise).rejects.toThrowError(new Error('any_error'))
  })

  test('should return a client if clientInsertOneRepository ok', async () => {
    const client = {
      email: 'any_email',
      name: 'any_name',
      password: 'any_password'
    }
    const response = {
      id: '1',
      ...client
    }
    const clientInsertOneRepositorySpy = jest.fn()
      .mockReturnValue(response)
    const sut = clientCreateOne(
      clientInsertOneRepositorySpy
    )
    const clientResult = await sut(client)
    expect(clientResult).toEqual(response)
  })
})
