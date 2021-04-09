import { ErrorModel } from '../protocols/common/error-model'

export type Result<Model> = {
  model: Model | undefined
  errorModel: ErrorModel | undefined
}

export const makeResultModel =
  <Model>(model: Model | undefined, error: ErrorModel | undefined): Result<Model> => ({
    model,
    errorModel: error
  })
