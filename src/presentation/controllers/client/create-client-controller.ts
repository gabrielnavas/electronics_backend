import { Request, Response } from 'express'
import { clientCreateOne } from '../../../domain/usecase/clients/create-one'
import { insertOneClientPostgres } from '../../../infra/database/postgres_business/repositories/clients/insert-one'

const createClientController = async (req: Request, res: Response) => {
  try {
    for (const attr of ['name', 'email', 'password', 'password_confirmation']) {
      if (!req.body[attr]) {
        return res.status(400).json(new Error(`missing param: ${attr}.`))
      }
    }

    if (typeof req.body.password !== 'number' ||
    typeof req.body.password !== 'string') {
      return res.status(400).json(new Error('password must be string or number'))
    } else if (req.body.password !== req.body.passwordConfimation) {
      return res.status(400)
        .json(new Error('password is different from password confirmation'))
    }

    const client = await clientCreateOne(insertOneClientPostgres)({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    })
    const { password, ...clientLessPassword } = client
    res.status(201).json(clientLessPassword)
  } catch (error) {
    res.status(500).json(new Error('server error.'))
  }
}

export { createClientController }
