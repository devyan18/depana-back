import { NextFunction, Request, Response } from 'express'
import { authDependencies } from '../dependencies'

export async function authGuard (req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ message: 'Missing authorization header' })
  }

  if (authorization.split(' ')[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const token = authorization.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Missing token' })
  }
  let user

  try {
    user = await authDependencies.authRepository.getMe(token)
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  if (!user) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  req.user = user

  next()
}
