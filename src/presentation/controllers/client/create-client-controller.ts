import { Request, Response } from 'express'
import { Client, validate } from '../../../domain/models/client'
import { clientCreateOne } from '../../../domain/usecase/clients/create-one'
import { insertOneClientPostgres } from '../../../infra/database/postgres_business/repositories/clients/insert-one'
import { isEmail } from '../../../infra/validation/validate'

const createClientController = async (req: Request, res: Response) => {
  try {
    const params = [
      'name',
      'email',
      'password',
      'passwordConfirmation'
    ]
    for (const paramName of params) {
      if (!req.body[paramName]) {
        return res.status(400).json(`missing param: ${paramName}.`)
      }
      if (typeof (req.body[paramName]) !== 'string') {
        return res.status(400).json(`type error: ${paramName} must to be string`)
      }
    }

    if (req.body.password !== req.body.passwordConfirmation) {
      const error = new Error('password is different from password confirmation')
      return res.status(400).json(error.message)
    }

    const clientOrError: Client | Error = validate(isEmail)({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    })

    if (clientOrError instanceof Error) {
      return res.status(400)
        .json(clientOrError.message)
    }

    const clientCreated = await clientCreateOne(
      insertOneClientPostgres
    )(clientOrError)
    const { password, ...clientLessPassword } = clientCreated
    res.status(201).json(clientLessPassword)
  } catch (error) {
    console.log(error)
    res.status(500).json(new Error('server error.').message)
  }
}

export { createClientController }
