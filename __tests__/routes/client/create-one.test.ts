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
    const expected = {
      param: ['name'],
      error: 'missing param: name.'
    }
    expect(response.body).toEqual(expected)
  })

  test('should be return status 400 if name is not string', async () => {
    const param = { ...client, name: { otherAtt: 'aaa' } }
    const response = await request.post('/api/client').send(param)
    expect(response.status).toEqual(400)
    const expected = {
      param: ['name'],
      error: 'type error: name must to be string'
    }
    expect(response.body).toEqual(expected)
  })

  test('should be return status 400 if email has is not provided', async () => {
    const { email, ...cliRest } = client
    const response = await request.post('/api/client').send(cliRest)
    expect(response.status).toEqual(400)
    const expected = {
      param: ['email'],
      error: 'missing param: email.'
    }
    expect(response.body).toEqual(expected)
  })

  test('should be return status 400 if email is not string', async () => {
    const param = { ...client, email: { otherAtt: 'aaa' } }
    const response = await request.post('/api/client').send(param)
    expect(response.status).toEqual(400)
    const expected = {
      param: ['email'],
      error: 'type error: email must to be string'
    }
    expect(response.body).toEqual(expected)
  })

  test('should be return status 400 if password has is not provided', async () => {
    const { password, ...cliRest } = client
    const response = await request.post('/api/client').send(cliRest)
    expect(response.status).toEqual(400)
    const expected = {
      param: ['password'],
      error: 'missing param: password.'
    }
    expect(response.body).toEqual(expected)
  })

  test('should be return status 400 if password is not string', async () => {
    const param = { ...client, password: { otherAtt: 'aaa' } }
    const response = await request.post('/api/client').send(param)
    expect(response.status).toEqual(400)
    const expected = {
      param: ['password'],
      error: 'type error: password must to be string'
    }
    expect(response.body).toEqual(expected)
  })

  test('should be return status 400 if passwordConfirmation has is not provided', async () => {
    const { passwordConfirmation, ...cliRest } = client
    const response = await request.post('/api/client').send(cliRest)
    expect(response.status).toEqual(400)
    const expected = {
      param: ['passwordConfirmation'],
      error: 'missing param: passwordConfirmation.'
    }
    expect(response.body).toEqual(expected)
  })

  test('should be return status 400 if passwordConfirmation is not string', async () => {
    const param = { ...client, passwordConfirmation: { otherAtt: 'aaa' } }
    const response = await request.post('/api/client').send(param)
    expect(response.status).toEqual(400)
    const expected = {
      param: ['passwordConfirmation'],
      error: 'type error: passwordConfirmation must to be string'
    }
    expect(response.body).toEqual(expected)
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
    const expected = {
      param: ['password', 'passwordConfirmation'],
      error: 'password is different from password confirmation'
    }
    expect(response.body).toEqual(expected)
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
    const expected = {
      param: ['email'],
      error: 'email format is wrong'
    }
    expect(response.body).toEqual(expected)
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
