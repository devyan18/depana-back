import { Router } from 'express'
import { authDependencies } from './dependencies'
import { authGuard } from './middlewares/auth.guard'

const { authRepository } = authDependencies

const authRouter = Router()

authRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body
  try {
    const response = await authRepository.signIn(email, password)
    res.status(200).json(response)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'Internal Server Error  ' })
    }
  }
})
authRouter.post('/signup', async (req, res) => {
  const user = req.body
  try {
    const response = await authRepository.signUp(user)
    res.status(201).json(response)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'Internal Server Error  ' })
    }
  }
})
authRouter.get('/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Missing token' })
  }
  try {
    const user = await authRepository.getMe(token)
    res.status(200).json(user)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'Internal Server Error  ' })
    }
  }
})

authRouter.get('/test', authGuard, async (req, res) => {
  res.status(200).json({ user: req.user, status: 'Authorized' })
})

export { authRouter }
