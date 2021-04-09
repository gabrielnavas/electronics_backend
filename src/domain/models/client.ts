import { makeResultModel, Result } from '../helpers/make-result-model'
import { IsEmail } from '../protocols/helpers/is-email'

type Client = {
  id?: string
  name :string
  email: string
  password: string
}

const validate = (isEmailFn: IsEmail) =>
  (client: Client): Result<Client | undefined> => {
    if (client.id !== undefined && client.id.length === 0) {
      return makeResultModel(undefined, {
        propNames: ['id'],
        error: new Error('id is empty')
      })
    }

    if (client.name.length < 2 || client.name.length > 80) {
      return makeResultModel(undefined, {
        propNames: ['name'],
        error: new Error('name must be between two and 80 characters')
      })
    }
    if (!isEmailFn(client.email)) {
      return makeResultModel(undefined, {
        propNames: ['email'],
        error: new Error('email format is wrong')
      })
    }
    if (client.password.length < 6 || client.password.length > 80) {
      return makeResultModel(undefined, {
        propNames: ['password'],
        error: new Error('password must be between two and 80 characters')
      })
    }
    return makeResultModel({ ...client }, undefined)
  }

export { Client, validate }
