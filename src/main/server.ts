import app from './app'
import env from './configs/env'

const listening = () => console.log(`SERVER RUNNING IN PORT ${env.server.port}`)

const server = app.listen(env.server.port, listening)
