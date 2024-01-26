import { useEffect, useState } from 'react'
import { gql } from '../__generated__'
import { useMutation } from '@apollo/client'

const LOGIN = gql(/* GraphQL */ `
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`)

const REGISTER = gql(/* GraphQL */ `
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password)
  }
`)

type AuthProps = {
  authScreenVisible: boolean
  setAuthScreenVisible: (value: boolean) => void
}

type AuthType = 'login' | 'register'
export const Auth = ({
  authScreenVisible,
  setAuthScreenVisible,
}: AuthProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [authType, setAuthType] = useState<AuthType>('login')

  const [login, { loading, data }] = useMutation(LOGIN, {
    variables: { username: username, password: password },
  })

  const [register, { loading: registerLoading, data: registerData }] =
    useMutation(REGISTER, {
      variables: { username: username, password: password },
    })

  useEffect(() => {
    if (data || registerData) {
      localStorage.setItem(
        'jwtToken',
        data?.login || registerData?.register || ''
      )
      window.location.reload()
    }
  }, [data, registerData])

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (authType === 'register') {
      register()
    } else {
      login()
    }
    setUsername('')
    setPassword('')
  }

  if (loading || registerLoading) return <p>Loading...</p>
  return (
    <div
      className="login-container"
      style={{ display: authScreenVisible ? 'visible' : 'hidden' }}
    >
      <p>{authType === 'register' ? 'Register' : 'Login'}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="button register" type="submit">
          {authType === 'register' ? 'Register' : 'Login'}
        </button>
      </form>
      <a
        href="#"
        style={{ textAlign: 'center', color: '#643843', fontSize: '13px' }}
        onClick={() =>
          setAuthType(authType === 'register' ? 'login' : 'register')
        }
      >
        {authType === 'login'
          ? `Don't have an account? Register`
          : 'Already have an account? Login'}
      </a>
    </div>
  )
}
