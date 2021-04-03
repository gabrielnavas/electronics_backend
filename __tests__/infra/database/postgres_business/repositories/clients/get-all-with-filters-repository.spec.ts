import { client as clientConnection } from '../../../../../../src/infra/database/postgres_business/connection'
import { getAllClientsWithFiltersPostgres } from '../../../../../../src/infra/database/postgres_business/repositories/clients/get-all-with-filters'

describe('ClientGetAllWithFilters Repository', () => {
  beforeAll(async () => {
    await clientConnection.query('DELETE FROM eletronics_navas.client;')
    await clientConnection.query(`
      insert into eletronics_navas.client (name, email, password) values ('gabriel', 'gabriel@email.com', '123');
      insert into eletronics_navas.client (name, email, password) values ('sara', 'sara@email.com', '123');
      insert into eletronics_navas.client (name, email, password) values ('lucas', 'lucas@email.com', '123');
      insert into eletronics_navas.client (name, email, password) values ('maria', 'maria@email.com', '123');
    `)
  })

  afterAll(async () => {
    await clientConnection.query('DELETE FROM eletronics_navas.client;')
  })

  test('should return zero-length clients', async () => {
    const clients = await getAllClientsWithFiltersPostgres({
      name: 'not_exists',
      email: 'not_exists'
    })
    expect(clients.length).toBe(0)
  })

  test('should return one by name client', async () => {
    const clients = await getAllClientsWithFiltersPostgres({
      name: 'bri',
      email: 'not_exists'
    })
    expect(clients.length).toBe(1)
  })

  test('should return one by email client', async () => {
    const clients = await getAllClientsWithFiltersPostgres({
      name: 'not_exists',
      email: 'abri'
    })
    expect(clients.length).toBe(1)
  })

  test('should return one by name and email client', async () => {
    const clients = await getAllClientsWithFiltersPostgres({
      name: 'gabri',
      email: 'briel'
    })
    expect(clients.length).toBe(1)
  })

  test('should return one by other name and email client', async () => {
    const clients = await getAllClientsWithFiltersPostgres({
      name: 'ga',
      email: 'luc'
    })
    expect(clients.length).toBe(2)
  })
})
