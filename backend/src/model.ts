import sqlite3 from 'sqlite3'
import { Database, open } from 'sqlite'
import bcrypt from 'bcrypt'

export async function setupDatabase() {
  const db = await open({
    filename: 'database.db',
    driver: sqlite3.Database,
  })

  await db.exec(
    `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            hashed_password TEXT
        );
        CREATE TABLE IF NOT EXISTS access_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            operation TEXT,
            timestamp TEXT,
            FOREIGN KEY(user_id) REFERENCES users(id)
        );`
  )
  return db
}

export async function createUser(db: Database, username: string, password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await db.run(
      'INSERT INTO users (username, hashed_password) VALUES (?, ?)',
      [username, hashedPassword]
    )
    return result.lastID
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      throw new Error(`User ${username} already exists`)
    }
    throw error
  }
}

export async function authenticateUser(
  db: Database,
  username: string,
  password: string
) {
  const user = await db.get(
    'SELECT id, hashed_password FROM users WHERE username = ?',
    [username]
  )
  if (user && (await bcrypt.compare(password, user.hashed_password))) {
    return user.id
  }
  return null // user not found or password incorrect
}

export async function logAccess(db: Database, userId: number, operation: string) {
  await db.run(
    'INSERT INTO access_logs (user_id, operation, timestamp) VALUES (?, ?, ?)',
    [userId, operation, new Date().toISOString()]
  )
}
