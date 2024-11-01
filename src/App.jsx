import { Route, Routes } from 'react-router-dom'
import Header from './Routes/Header/Header'
import Register from './Routes/Register/Register'
import NewEntrie from './Routes/NewEntrie/NewEntrie'
import Home from './Components/Home/Home'
import Login from './Routes/Login/Login'
import Profile from './Routes/Profile/Profile'
import EditUser from './Routes/EditUser/EditUser'
import Entries from './Routes/Entries/Entries'
import EditEntry from './Routes/EditEntries/EditEntries'
import './App.css'



function App() {


  return (
    <>
    <Header/>
      <Routes>
        
        <Route path="/" element={<Home />}/>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="entries/new" element={<NewEntrie />}/>
        <Route path="/users" element={<Profile />}/>
        <Route path="users/users/edit" element={<EditUser/>}/>
        <Route path="/mis_entradas" element={<Entries/>}/>
        <Route path="/entries/:entryId/edit" element={<EditEntry/>} />

      </Routes>
    </>
  )
}

export default App