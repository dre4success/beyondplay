import { setupDatabase, createUser, authenticateUser, logAccess } from './model'
import { Database } from 'sqlite'
import bcrypt from 'bcrypt'

jest.mock('sqlite', () => ({
  open: jest.fn().mockResolvedValue({
    exec: jest.fn(),
    run: jest.fn().mockResolvedValue({ lastID: 1 }),
    get: jest
      .fn()
      .mockResolvedValue({ id: 1, hashed_password: 'hashed_password' }),
  }),
}))

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
  compare: jest.fn().mockResolvedValue(true),
}))

describe('Database functions', () => {
  let db: Database

  beforeAll(async () => {
    db = await setupDatabase()
  })

  it('should create a user', async () => {
    const username = 'test'
    const password = 'test'

    const userId = await createUser(db, username, password)

    expect(userId).toBe(1)
    expect(bcrypt.hash).toHaveBeenCalledWith(password, 10)
    expect(db.run).toHaveBeenCalledWith(
      'INSERT INTO users (username, hashed_password) VALUES (?, ?)',
      [username, 'hashed_password']
    )
  })

  it('should authenticate a user', async () => {
    const username = 'test'
    const password = 'test'

    const userId = await authenticateUser(db, username, password)

    expect(userId).toBe(1)
    expect(bcrypt.compare).toHaveBeenCalledWith(password, 'hashed_password')
    expect(db.get).toHaveBeenCalledWith(
      'SELECT id, hashed_password FROM users WHERE username = ?',
      [username]
    )
  })

  it('should log access', async () => {
    const userId = 1
    const operation = 'test'

    await logAccess(db, userId, operation)

    expect(db.run).toHaveBeenCalledWith(
      'INSERT INTO access_logs (user_id, operation, timestamp) VALUES (?, ?, ?)',
      [userId, operation, expect.any(String)]
    )
  })
})
