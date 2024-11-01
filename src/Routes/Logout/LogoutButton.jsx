import React from 'react'
import { useUser } from '../../UserContext'


const LogoutButton = () => {
    const [,setUser] = useUser()

    const handleLogout = () => {
        setUser(null)
    }

    return (
        <button className='btn-logout' onClick={handleLogout}   
        >Cerrar sesión</button>
    )
}


export default LogoutButton