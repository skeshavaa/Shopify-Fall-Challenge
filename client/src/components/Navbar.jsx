import React from 'react'
import '../styles/Navbar.css'

function Navbar() {
    return (
        <div className="navContainer">
            <div className="leftContainer">
                <h1 className="navLink">Postman Request Library</h1>
                <h1 className="navLink">Swagger Documentation</h1>
            </div>
            <div className="rightContainer">
                <h1 className="navLink">Sign In</h1>
            </div>
        </div>
    )
}

export default Navbar
