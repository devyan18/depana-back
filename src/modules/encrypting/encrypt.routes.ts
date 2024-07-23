import { Router } from 'express'
import { EncryptService } from './encrypt.service'
import { compareValidation, hashValidation } from './validations'

const encryptRouter = Router()

encryptRouter.post('/hash', hashValidation, async (req, res) => {
  const { text } = req.body

  const hash = await EncryptService.hash(text)

  res.json({ hash })
})

encryptRouter.post('/compare', compareValidation, async (req, res) => {
  const { text, hash } = req.body
  const result = await EncryptService.compare(text, hash)

  res.json({ result })
})

export { encryptRouter }
