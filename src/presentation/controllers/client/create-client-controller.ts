import { Request, Response } from 'express'
import { validate } from '../../../domain/models/client'
import { clientCreateOne } from '../../../domain/usecase/clients/create-one'
import { insertOneClientPostgres } from '../../../infra/database/postgres_business/repositories/clients/insert-one'
import { isEmail } from '../../../infra/validation/validate'

const verifyBody = (req: Request, res: Response): boolean => {
  let allRight = true
  const params = [
    'name',
    'email',
    'password',
    'passwordConfirmation'
  ]
  for (const paramName of params) {
    if (!req.body[paramName]) {
      res.status(400).json({
        param: [paramName],
        error: `missing param: ${paramName}.`
      })
      allRight = false
      break
    }
    if (typeof (req.body[paramName]) !== 'string') {
      res.status(400).json({
        param: [paramName],
        error: `type error: ${paramName} must to be string`
      })
      allRight = false
      break
    }
  }
  return allRight
}

const verifyPasswords = (req: Request, res: Response): boolean => {
  if (req.body.password !== req.body.passwordConfirmation) {
    res.status(400).json({
      param: ['password', 'passwordConfirmation'],
      error: 'password is different from password confirmation'
    })
    return false
  }
  return true
}

const createClientController = async (req: Request, res: Response) => {
  try {
    if (!verifyBody(req, res)) {
      return res.end()
    }
    if (!verifyPasswords(req, res)) {
      return res.end()
    }

    const { model: clientModel, errorModel } = validate(isEmail)({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    })

    if (!clientModel) {
      return res.status(400)
        .json({
          param: errorModel?.propNames,
          error: errorModel?.error.message
        })
    }
    const clientCreateOneUseCase = clientCreateOne(
      insertOneClientPostgres
    )
    const clientCreated = await clientCreateOneUseCase(clientModel)
    const { password, ...clientLessPassword } = clientCreated

    res.status(201).json(clientLessPassword)
  } catch (error) {
    console.log(error)
    res.status(500).json(new Error('server error.').message)
  }
}

export { createClientController }
