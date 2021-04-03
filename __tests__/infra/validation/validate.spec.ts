import { isEmail } from '../../../src/infra/validation/validate'

describe('Infra Validation', () => {
  test('should return false if email is wrong', () => {
    const emailWrong = 'email'
    const isValid = isEmail(emailWrong)
    expect(isValid).toBe(false)
  })
  test('should return true if email is valid', () => {
    const emailWrong = 'any_name@email.com'
    const isValid = isEmail(emailWrong)
    expect(isValid).toBe(true)
  })
})
