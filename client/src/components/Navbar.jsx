import React, { useContext } from 'react'
import '../styles/Navbar.css'
import { AuthContext } from '../App'
import { Link } from 'react-router-dom'

function Navbar() {
    const { state, dispatch } = useContext(AuthContext)

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch({
            type: "LOGOUT"
        })
    }

    return (
        <div className="navContainer">
            <div className="leftContainer">
                <h1 className="navLink">Postman Request Library</h1>
                <h1 className="navLink">Swagger Documentation</h1>
            </div>
            <div className="rightContainer">
                {state.isAuthenticated ? 
                <h1 className="navLink logout" onClick={(e) => handleLogout(e)}>Logout</h1> :
                <Link className="navA" to="/auth"><h1 className="navLink">Login/Sign Up</h1></Link>}
            </div>
        </div>
    )
}

export default Navbar
