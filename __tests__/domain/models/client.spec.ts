import { Client, validate } from '../../../src/domain/models/client'
import { isEmail } from '../../../src/infra/validation/validate'

const makeSut = () => {
  return validate(isEmail)
}

describe('Client Models', () => {
  test('should throw if id is zero length', () => {
    const sut = makeSut()
    const client = {
      id: '',
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    } as Client
    const error = sut(client)
    expect(error).toEqual(new Error('id is empty'))
  })

  test('should throw if name is small', () => {
    const sut = makeSut()
    const client = {
      id: 'any_id',
      name: 'a',
      email: 'any_email@email.com',
      password: 'any_password'
    } as Client
    const error = sut(client)
    expect(error).toEqual(new Error('name must be between two and 80 characters'))
  })

  test('should throw if name is large', () => {
    const sut = makeSut()
    const client = {
      id: 'any_id',
      name: Array(81).fill('a').join(''),
      email: 'any_email@email.com',
      password: 'any_password'
    } as Client
    const error = sut(client)
    expect(error).toEqual(new Error('name must be between two and 80 characters'))
  })

  test('should throw if email is wrong', () => {
    const sut = makeSut()
    const client = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    } as Client
    const error = sut(client)
    expect(error).toEqual(new Error('email must be between two and 80 characters'))
  })

  test('should throw if password is small', () => {
    const sut = makeSut()
    const client = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'a'
    } as Client
    const error = sut(client)
    expect(error).toEqual(new Error('password must be between two and 80 characters'))
  })

  test('should throw if password is large', () => {
    const sut = makeSut()
    const client = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@email.com',
      password: Array(81).fill('a').join('')
    } as Client
    const error = sut(client)
    expect(error).toEqual(new Error('password must be between two and 80 characters'))
  })

  test('should return a new client instance after validate', () => {
    const sut = makeSut()
    const client = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    } as Client
    const newClient = sut(client)
    const objectEquals = Object.is(client, newClient)
    expect(objectEquals).toEqual(false)
  })
})
