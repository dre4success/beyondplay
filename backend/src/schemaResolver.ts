import { delegateToSchema } from '@graphql-tools/delegate'
import { buildHTTPExecutor } from '@graphql-tools/executor-http'
import { stitchSchemas } from '@graphql-tools/stitch'
import { schemaFromExecutor } from '@graphql-tools/wrap'
import { OperationTypeNode } from 'graphql'
import { authenticateUser, logAccess, createUser } from './model'
import jwt from 'jsonwebtoken'
import { typeDefs } from './typeDefs'
import dotenv from 'dotenv'

dotenv.config()

export async function createRemoteSchema(url: string) {
  try {
    const executor = buildHTTPExecutor({ endpoint: url })
    const schema = await schemaFromExecutor(executor)
    return { schema, executor }
  } catch (error) {
    console.error(`Error fetching schema from ${url}:`, error)
    throw new Error(`Failed to fetch schema from ${url}`)
  }
}

export async function createStitchedSchema() {
  try {
    const starWarsSchema = await createRemoteSchema(
      process.env.STAR_WARS_ENDPOINT
    )
    const countrySchema = await createRemoteSchema(
      process.env.COUNTRIES_ENDPOINT
    )

    return stitchSchemas({
      subschemas: [starWarsSchema, countrySchema],
      typeDefs,
      resolvers: {
        Mutation: {
          login: async (_, { username, password }, { db }) => {
            const userId = await authenticateUser(db, username, password)
            if (userId) {
              await logAccess(db, userId, 'login')
              return jwt.sign({ userId }, process.env.JWT_SECRET)
            }
            throw new Error('Invalid username or password')
          },
          register: async (_, { username, password }, { db }) => {
            const userId = await createUser(db, username, password)
            await logAccess(db, userId, 'register')
            return jwt.sign({ userId }, process.env.JWT_SECRET)
          },
        },
        Query: {
          accessLogs: async (parent, args, { db, userId }) => {
            if (!userId) {
              throw new Error('Not authenticated')
            }
            const logs = await db.all(
              'SELECT timestamp, operation, username FROM access_logs JOIN users ON users.id = access_logs.user_id'
            )
            return logs
          },
          allFilms: async (_, args, { db, userId }, info) => {
            if (!userId) {
              throw new Error('Not authenticated')
            }
            logAccess(db, userId, 'allFilms')
            return delegateToSchema({
              schema: starWarsSchema,
              operation: OperationTypeNode.QUERY,
              fieldName: 'allFilms',
              args: args,
              info,
            })
          },
        },
      },
    })
  } catch (error) {
    console.error('Error stitching schemas:', error)
    throw error
  }
}
