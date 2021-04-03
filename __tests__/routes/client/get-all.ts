import supertest from 'supertest'

import app from '../../../src/main/app'
import { client as clientConnection } from '../../../src/infra/database/postgres_business/connection'

describe('Get All Clients', () => {
  let request: supertest.SuperTest<supertest.Test>

  beforeAll(async () => {
    request = await supertest(app)
  })

  test('should empty list', async () => {
    await clientConnection.query('DELETE FROM eletronics_navas.client;')
    const response = await request.get('/api/client')
    const body = response.body
    expect(body).toEqual([])
  })

  test('should get 4 clients', async () => {
    await clientConnection.query(`
      insert into eletronics_navas.client (name, email, password) values ('gabriel', 'gabriel@email.com', '123');
      insert into eletronics_navas.client (name, email, password) values ('sara', 'sara@email.com', '123');
      insert into eletronics_navas.client (name, email, password) values ('lucas', 'lucas@email.com', '123');
      insert into eletronics_navas.client (name, email, password) values ('maria', 'maria@email.com', '123');
    `)
    const response = await request.get('/api/client')
    const body = response.body
    expect(body.length).toBe(4)

    expect(typeof body[0].id).toEqual('string')
    expect(body[0].name).toEqual('gabriel')
    expect(body[0].email).toEqual('gabriel@email.com')

    expect(typeof body[2].id).toEqual('string')
    expect(body[2].name).toEqual('lucas')
    expect(body[2].email).toEqual('lucas@email.com')
  })
})
