import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { setupDatabase } from './model'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { createStitchedSchema } from './schemaResolver'
import dotenv from 'dotenv'

dotenv.config()

async function startServer() {
  const schema = await createStitchedSchema()

  const server = new ApolloServer({ schema })

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization || ''
      const db = await setupDatabase()
      let userId = null
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload
        userId = decoded.userId
      } catch (error) {
        console.error('JWT verification error:', error)
      }
      return { db, userId }
    },
    listen: { port: 4000 },
  })

  console.log(`🚀  Server ready at: ${url}`)
}

startServer()
