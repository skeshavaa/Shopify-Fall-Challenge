import React from 'react'
import '../styles/Landing.css'
import Search from '../components/Search.jsx'

function Landing() {
    return (
        <div className="landingContainer">
            <h1 className="heading1">Keshavaa's Image Repository</h1>
            <h1 className="heading2">Submission for Shopfy’s Fall Intern Challenge</h1>
            <Search />
        </div>
    )
}

export default Landing
