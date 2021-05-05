import React, { useState } from 'react'
import '../styles/Auth.css'

function Auth() {
    const [login, setLogin] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    return (
        <div className="authContainer">
            {login ? null : 
            <div>
                <p className="authLabel">Name</p>
                <input className="authInput" value={name} placeholder="Enter your name" onChange={(e) => setName(e.target.value)}/>
            </div>
            }
            <p className="authLabel">Email</p>
            <input className="authInput" value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/>
            <p className="authLabel">Password</p>
            <input className="authInput" value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
            <div className="authMsgs">
                {login ? 
                <p className="changeAuth">Don't have an account? <span className="highlight" onClick={(e) => setLogin(!login)}>Sign up here!</span></p> :
                <p className="changeAuth">Already Registered? <span className="highlight" onClick={(e) => setLogin(!login)}>Sign in here!</span></p>
                }
                <p className="errorMsgs">{errorMsg}</p>
                <button className="authButton">{login ? "Login" : "Sign In"}</button>
            </div>
        </div>
    )
}

export default Auth
