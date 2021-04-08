import { clientCreateOne } from '../../../../src/domain/usecase/clients/create-one'

const makeSut = () => {
  const clientInsertOneRepositorySpy = jest.fn()
  const sut = clientCreateOne(clientInsertOneRepositorySpy)
  return {
    sut,
    clientInsertOneRepositorySpy
  }
}

describe('clientCreateOne useCase', () => {
  test('should call ClientInsertOneRepository with client', async () => {
    const { sut, clientInsertOneRepositorySpy } = makeSut()
    const client = {
      email: 'any_email',
      name: 'any_name',
      password: 'any_password'
    }
    await sut(client)
    expect(clientInsertOneRepositorySpy).toBeCalledTimes(1)
  })
})
