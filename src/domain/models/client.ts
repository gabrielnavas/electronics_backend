type Client = {
  id?: string
  name :string
  email: string
  password: string
}

const validate = (client: Client): Error | Client => {
  if (client.id && client.id.length === 0) {
    return new Error('id is empty')
  }

  if (client.name.length < 2 || client.name.length > 80) {
    return new Error('name must be between two and 80 characters')
  }

  if (client.email.length < 2 || client.email.length > 80) {
    return new Error('email must be between two and 80 characters')
  }
  if (client.password.length < 2 || client.password.length > 80) {
    return new Error('password must be between two and 80 characters')
  }

  return { ...client }
}

export { Client, validate }
