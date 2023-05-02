import { useEffect, useState, createContext } from 'react'
import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'

import { GET_TRANSACTIONS, GET_PLATFORMS } from '../data/graphql.api'

export const AuthContext = createContext()

function getSession() {
  const session = localStorage.getItem('authData')
  if (session) {
    return JSON.parse(session)
  }
  return null
}

async function getTRM() {
  try {
    const response = await fetch('https://www.datos.gov.co/resource/32sa-8pi3.json?$order=vigenciadesde%20DESC&$limit=1')
    const data = await response.json()
    const trm = data[0].valor
    return trm
  } catch (error) {
    console.error('Error getting TRM:', error)
    return null
  }
}

export function AuthProvider({ children }) {
  const [authData, setAuthData] = useState(null)
  const step = authData ? 1 : 0

  const [transactions, setTransactions] = useState([])
  const [platforms, setPlatforms] = useState([])
  const [trm, setTRM] = useState(null)

  // Updates authData if session exists
  useEffect(() => {
    const session = getSession()
    if (session) {
      setAuthData(session)
    }
  }, [])


  // Handles log in
  const handlerLogIn = (data) => {
    setAuthData(data)
    localStorage.setItem('authData', JSON.stringify(data.login.user))
    localStorage.setItem('token', data.login.access_token)
  }

  // Query to get all the transactions
  const resultTransactions = useQuery(GET_TRANSACTIONS)
  const resultPlatforms = useQuery(GET_PLATFORMS)

  // Updates transactions if data exists
  useEffect(() => {
    async function fetchData () {
      if (resultTransactions.data) {
        setTransactions(resultTransactions.data.transactions)
        const trm = await getTRM()
        setTRM(trm)
      }
      if (resultPlatforms.data) {
        setPlatforms(resultPlatforms.data.platforms)
      }
    }
    fetchData()
  }, [resultTransactions, resultPlatforms])

  return (
    <AuthContext.Provider value={{
      authData,
      handlerLogIn, 
      transactions,
      platforms,
      trm,
      loading: resultTransactions.loading || resultPlatforms.loading,
    }}>
      {children[step]}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node
}