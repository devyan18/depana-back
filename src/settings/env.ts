export const env = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/encrypting',
  SECRET_KEY: process.env.SECRET_KEY || 'secret'
}
