import {
  client as clientConnection
} from '../../../../../../src/infra/database/postgres_business/connection'
import {
  insertOneClientPostgres
} from '../../../../../../src/infra/database/postgres_business/repositories/clients/insert-one'

describe('getAllClientsPostgres Repository', () => {
  beforeAll(async () => {
    await clientConnection.query('DELETE FROM eletronics_navas.client;')
  })

  afterAll(async () => {
    await clientConnection.query('DELETE FROM eletronics_navas.client;')
  })

  test('should return clients', async () => {
    await clientConnection.query(`
      SELECT (id, name, email, password) 
      FROM eletronics_navas.client;
    `)
    const client = {
      email: 'any_email@email.com',
      name: 'any_name',
      password: 'any_password'
    }
    const clientResult = await insertOneClientPostgres(client)
    expect(typeof clientResult.id).toEqual('string')
    expect(clientResult.name).toEqual('any_name')
    expect(clientResult.email).toEqual('any_email@email.com')
    expect(clientResult.password).toEqual('any_password')
  })
})
