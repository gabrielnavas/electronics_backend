import { client as clientConnection } from '../../../../../../src/infra/database/postgres_business/connection'
import { getAllClientsPostgres } from '../../../../../../src/infra/database/postgres_business/repositories/clients/get-all'

describe('getAllClientsPostgres Repository', () => {
  test('should return clients', async () => {
    await clientConnection.query('DELETE FROM eletronics_navas.client;')
    await clientConnection.query(`
    insert into eletronics_navas.client (name, email, password) values ('gabriel', 'gabriel@email.com', '123');
    insert into eletronics_navas.client (name, email, password) values ('sara', 'sara@email.com', '123');
    insert into eletronics_navas.client (name, email, password) values ('lucas', 'lucas@email.com', '123');
    insert into eletronics_navas.client (name, email, password) values ('maria', 'maria@email.com', '123');
  `)
    const clients = await getAllClientsPostgres()
    expect(clients.length).toBe(4)
    expect(typeof clients[1].id).toEqual('string')
    expect(clients[1].name).toEqual('sara')
    expect(clients[1].email).toEqual('sara@email.com')
    expect(clients[1].password).toEqual('123')
  })
})
