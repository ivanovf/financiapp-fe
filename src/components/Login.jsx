

import { useMutation, gql } from '@apollo/client'
import { useRef, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

function Login() {
  const { handlerLogIn } = useContext(AuthContext)

  const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        access_token
        user {
          id
          email
        }
      }
    }`

  const email = useRef('')
  const password = useRef('')
  const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION)

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ variables: { email: email.current.value, password: password.current.value } })
  }

  if (data) {
    handlerLogIn(data)
  }

  return (
    <div className="bg-teal-400 p-10 h-screen">
      <h1 className="text-center font-bold text-3xl text-white mb-4">
        User login
      </h1>
      {loading ? <p>Loading...</p> : null}
      <form onSubmit={handleSubmit}>
        <input 
          className="rounded-md p-2 mb-2"
          type="text"
          name="user"
          placeholder="Username"
          ref={email}
          required/>
        <input 
          className="rounded-md p-2 mb-2"
          type="password"
          name="password"
          placeholder="Password"
          ref={password}
          required/>
        <button>Login</button>
        {error ? <p className="text-red-500">{error.message}</p> : null}
      </form>
    </div>
  )
}

export default Login