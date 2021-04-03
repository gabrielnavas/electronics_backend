import { isEmail } from '../../infra/validation/validate'

type Client = {
  id?: string
  name :string
  email: string
  password: string
}

type IsEmail = (email: string) => boolean

const validate = (isEmailFn: IsEmail) =>
  (client: Client): Error | Client => {
    if (client.id !== undefined && client.id.length === 0) {
      return new Error('id is empty')
    }
    if (client.name.length < 2 || client.name.length > 80) {
      return new Error('name must be between two and 80 characters')
    }
    if (!isEmail(client.email)) {
      return new Error('email must be between two and 80 characters')
    }
    if (client.password.length < 6 || client.password.length > 80) {
      return new Error('password must be between two and 80 characters')
    }
    return { ...client }
  }

export { Client, validate }
