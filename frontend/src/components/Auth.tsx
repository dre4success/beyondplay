import { useState } from 'react'
import { gql } from '../__generated__'

const LOGIN = gql(/* GraphQL */ `
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`)

const REGISTER = gql(/* GraphQL */ `
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`)

type AuthProps = {
  authScreenVisible: boolean
  setAuthScreenVisible: (value: boolean) => void
}
export const Auth = ({
  authScreenVisible,
  setAuthScreenVisible,
}: AuthProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // Add your login logic here, e.g., make an API call
    console.log('Username:', username)
    console.log('Password:', password)
    // Reset the form after submission
    setUsername('')
    setPassword('')
    setAuthScreenVisible(false)
  }

  return (
    <div
      className="login-container"
      style={{ display: authScreenVisible ? 'visible' : 'hidden' }}
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}
