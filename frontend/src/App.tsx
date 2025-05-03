import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRouter from './routes/AppRouter'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/navbar/Navbar'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <AppRouter />
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
