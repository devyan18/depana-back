import { connect } from 'mongoose'
import { env } from './env'

export const connectMongo = async () => {
  try {
    const db = await connect(env.MONGO_URI)
    console.log('App connected to:', db.connection.name)
  } catch (error) {
    console.error('Error connecting to database:', error)
  }
}
