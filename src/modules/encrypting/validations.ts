import { NextFunction, Request, Response } from 'express'

export function compareValidation (req: Request, res: Response, next: NextFunction) {
  const { text, hash } = req.body

  if (!text || !hash) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  if (typeof text !== 'string' || typeof hash !== 'string') {
    return res.status(400).json({ message: 'Invalid data type' })
  }

  next()
}

export function hashValidation (req: Request, res: Response, next: NextFunction) {
  const { text } = req.body

  if (!text) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  if (typeof text !== 'string') {
    return res.status(400).json({ message: 'Invalid data type' })
  }

  next()
}
