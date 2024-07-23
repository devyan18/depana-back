import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'

import { encryptRouter } from './modules/encrypting/encrypt.routes'
import { connectMongo } from './settings/connect.mongo'
import { authRouter } from './modules/auth/infrastructure/auth.routes'

async function main () {
  const app = express()
  const port = process.env.PORT

  await connectMongo()

  app.use(express.json())
  app.use(morgan('dev'))

  app.use('/encrypt', encryptRouter)

  app.use('/auth', authRouter)

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
  })
}

main()
