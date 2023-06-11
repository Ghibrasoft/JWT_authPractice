import './App.css'
import { Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import UserProfile from './components/UserProfile'
import { useZustandStore } from './components/zustandStore/ZustandStore'

function App() {
  const { authenticated } = useZustandStore();
  return (
    <section className="flex justify-center items-center h-screen">
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        {authenticated && <Route path='/profile/:id' element={<UserProfile />} />}

        {/* catch all routes */}
        <Route path='*' element={<Register />} />
      </Routes>
    </section>
  )
}

export default App
