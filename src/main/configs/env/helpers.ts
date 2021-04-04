export const isDevOrTestEnv = () =>
  process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev'
