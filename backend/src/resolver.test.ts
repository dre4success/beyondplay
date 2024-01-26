import { createStitchedSchema } from './schemaResolver'
import { authenticateUser, logAccess, createUser } from './model'
import jwt from 'jsonwebtoken'
import { ApolloServer } from '@apollo/server'

jest.mock('./model')
jest.mock('jsonwebtoken')

describe('createStitchedSchema', () => {
  let testServer: ApolloServer
  let db: any
  let username: string
  let password: string
  let userId: string

  beforeEach(async () => {
    db = {} 
    username = 'test'
    password = 'test'
    userId = '1'

    const schema = await createStitchedSchema()
    testServer = new ApolloServer({ schema })
  })

  it('should handle login mutation', async () => {
    const token = 'jwt_login_token'
    ;(authenticateUser as jest.Mock).mockResolvedValue(userId)
    ;(logAccess as jest.Mock).mockResolvedValue(undefined)
    ;(jwt.sign as jest.Mock).mockReturnValue(token)

    const result: any = await testServer.executeOperation({
      query: `
        mutation Login($username: String!, $password: String!) {
          login(username: $username, password: $password)
        }
      `,
      variables: { username, password },
    })

    expect(result.body.singleResult.data.login).toBe(token)
  })

  it('should handle register mutation', async () => {
    const token = 'jwt_register_token'
    ;(createUser as jest.Mock).mockResolvedValue(userId)
    ;(logAccess as jest.Mock).mockResolvedValue(undefined)
    ;(jwt.sign as jest.Mock).mockReturnValue(token)

    const result: any = await testServer.executeOperation({
      query: `
        mutation Register($username: String!, $password: String!) {
          register(username: $username, password: $password)
        }
      `,
      variables: { username, password },
      
    })

    expect(result.body.singleResult.data.register).toBe(token)
  })
})
