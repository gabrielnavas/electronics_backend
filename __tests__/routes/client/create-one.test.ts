import supertest from 'supertest'

import app from '../../../src/main/app'
import { client as clientConnection } from '../../../src/infra/database/postgres_business/connection'

describe('Check if attributes if the body is provided', () => {
  let request: supertest.SuperTest<supertest.Test>

  const client = {
    email: 'any_email@email.com',
    name: 'any_name',
    password: 'any_password',
    passwordConfirmation: 'any_password_different'
  }

  beforeAll(async () => {
    request = await supertest(app)
    await clientConnection.none('delete from eletronics_navas.client')
  })

  test('should be return status 400 if name has is not provided', async () => {
    const { name, ...cliRest } = client
    const response = await request.post('/api/client').send(cliRest)
    expect(response.status).toEqual(400)
    expect(response.body).toEqual('missing param: name.')
  })

  test('should be return status 400 if name is not string', async () => {
    const param = { ...client, name: { otherAtt: 'aaa' } }
    const response = await request.post('/api/client').send(param)
    expect(response.status).toEqual(400)
    expect(response.body).toEqual('type error: name must to be string')
  })

  test('should be return status 400 if email has is not provided', async () => {
    const { email, ...cliRest } = client
    const response = await request.post('/api/client').send(cliRest)
    expect(response.status).toEqual(400)
    expect(response.body).toEqual('missing param: email.')
  })

  test('should be return status 400 if email is not string', async () => {
    const param = { ...client, email: { otherAtt: 'aaa' } }
    const response = await request.post('/api/client').send(param)
    expect(response.status).toEqual(400)
    expect(response.body).toEqual('type error: email must to be string')
  })

  test('should be return status 400 if password has is not provided', async () => {
    const { password, ...cliRest } = client
    const response = await request.post('/api/client').send(cliRest)
    expect(response.status).toEqual(400)
    expect(response.body).toEqual('missing param: password.')
  })

  test('should be return status 400 if password is not string', async () => {
    const param = { ...client, password: { otherAtt: 'aaa' } }
    const response = await request.post('/api/client').send(param)
    expect(response.status).toEqual(400)
    expect(response.body).toEqual('type error: password must to be string')
  })

  test('should be return status 400 if passwordConfirmation has is not provided', async () => {
    const { passwordConfirmation, ...cliRest } = client
    const response = await request.post('/api/client').send(cliRest)
    expect(response.status).toEqual(400)
    expect(response.body).toEqual('missing param: passwordConfirmation.')
  })

  test('should be return status 400 if passwordConfirmation is not string', async () => {
    const param = { ...client, passwordConfirmation: { otherAtt: 'aaa' } }
    const response = await request.post('/api/client').send(param)
    expect(response.status).toEqual(400)
    expect(response.body).toEqual('type error: passwordConfirmation must to be string')
  })
})

describe('Check the passwords', () => {
  let request: supertest.SuperTest<supertest.Test>

  beforeAll(async () => {
    request = await supertest(app)
  })

  test('should return status 400 if password is different from password confirmation', async () => {
    const client = {
      email: 'any_email@email.com',
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password_different'
    }
    const response = await request.post('/api/client')
      .send(client)
    expect(response.status).toEqual(400)
    expect(response.body).toEqual('password is different from password confirmation')
  })
})

describe('Create a client', () => {
  let request: supertest.SuperTest<supertest.Test>

  beforeAll(async () => {
    request = await supertest(app)
    await clientConnection.none('delete from eletronics_navas.client;')
  })

  afterAll(async () => {
    await clientConnection.none('delete from eletronics_navas.client;')
  })

  test('should return status 400 if emails is small', async () => {
    const client = {
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
    const response = await request.post('/api/client')
      .send(client)
    expect(response.status).toEqual(400)
    expect(response.body).toEqual('email format is wrong')
  })

  test('should create a user and return with less password', async () => {
    const client = {
      email: 'any_email@email.com',
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
    const response = await request.post('/api/client').send(client)
    expect(response.status).toEqual(201)
    expect(typeof response.body.id).toEqual('string')
    expect(response.body.email).toEqual('any_email@email.com')
    expect(response.body.name).toEqual('any_name')
    expect(response.body.password).toEqual(undefined)
  })
})
