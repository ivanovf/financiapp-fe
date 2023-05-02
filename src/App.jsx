import { AuthProvider } from './contexts/AuthContext'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Login />
      <Dashboard />
    </AuthProvider>
  )
}

export default App
