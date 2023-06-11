import './App.css'
import { Routes, Route } from 'react-router-dom'
import UserProfile from './pages/UserProfile'
import { useZustandStore } from './zustandStore/ZustandStore'
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  const { authenticated } = useZustandStore();
  return (
    <>
      <Navbar />
      <section className="flex justify-center items-center h-screen">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          {authenticated && <Route path='/profile/:id' element={<UserProfile />} />}

          {/* catch all routes */}
          <Route path='*' element={<Home />} />
        </Routes>
      </section>
    </>
  )
}

export default App
