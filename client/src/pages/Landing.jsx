import React from 'react'
import '../styles/Landing.css'
import Github from '../githubIcon.png'
import Search from '../components/Search.jsx'

function Landing() {
    return (
        <div className="landingContainer">
            <div className="row">
                <h1 className="heading1">Keshavaa's Image Repository</h1>
                <a target="_blank" href="https://github.com/skeshavaa/Shopify-Fall-Challenge"><img className="githubIcon" src={Github}/></a>
            </div>
            <h1 className="heading2">Submission for Shopfy’s Fall Intern Challenge</h1>
            <a className="APILink" href="/api-docs" target="_blank"><h1 className="heading3">If you would like to add an image, please use the API <span className="highlight">Located Here!</span></h1></a>
            <Search />
        </div>
    )
}

export default Landing
