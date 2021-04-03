import supertest from 'supertest'

import app from '../../../src/main/app'
import { client as clientConnection } from '../../../src/infra/database/postgres_business/connection'

describe('Get All Clients', () => {
  let request: supertest.SuperTest<supertest.Test>

  beforeAll(async () => {
    request = await supertest(app)
    await clientConnection.none('delete from eletronics_navas.client')
    await clientConnection.query(`
      insert into eletronics_navas.client (name, email, password) values ('gabriel', 'gabriel@email.com', '123');
      insert into eletronics_navas.client (name, email, password) values ('sara', 'sara@email.com', '123');
      insert into eletronics_navas.client (name, email, password) values ('lucas', 'lucas@email.com', '123');
      insert into eletronics_navas.client (name, email, password) values ('maria', 'maria@email.com', '123');
    `)
  })

  test('should get one client', async () => {
    const name = 'gabri'
    const email = 'any_not_exists_email'
    const query = `?name=${name}&email=${email}`
    const response = await request.get(`/api/client/filters${query}`)
    const body = response.body
    expect(body.length).toBe(1)

    expect(typeof body[0].id).toEqual('string')
    expect(body[0].name).toEqual('gabriel')
    expect(body[0].email).toEqual('gabriel@email.com')
  })

  test('should get two client', async () => {
    const name = 'gabri'
    const email = 'luca'
    const query = `?name=${name}&email=${email}`
    const response = await request.get(`/api/client/filters${query}`)
    const body = response.body
    expect(body.length).toBe(2)

    expect(typeof body[0].id).toEqual('string')
    expect(body[0].name).toEqual('gabriel')
    expect(body[0].email).toEqual('gabriel@email.com')
  })
})
