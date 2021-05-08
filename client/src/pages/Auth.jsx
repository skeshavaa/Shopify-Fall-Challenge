import React, { useState, useContext } from 'react'
import '../styles/Auth.css'
import { AuthContext } from '../App'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

function Auth() {
    const [login, setLogin] = useState(true)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const { state, dispatch } = useContext(AuthContext)
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login){
            const body = JSON.stringify({email, password})
            fetch("/api/users/login", {
                method: "POST",
                body: body,
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((res) => {
                if (res.ok){
                    return res.json()
                }
                throw res;
            }).then((resJson => {
                dispatch({
                    type: "LOGIN",
                    payload: resJson
                })
            })).catch(error => {
                setErrorMsg(error.msg)
            })    
        }else{
            const body = JSON.stringify({name, email, password})
            fetch("/api/users/register", {
                method: "POST",
                body: body,
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((res) => {
                console.log(res)
                if (res.ok){
                    return res.json()
                }
                throw res;
            }).then((resJson => {
                dispatch({
                    type: "LOGIN",
                    payload: resJson
                })
            })).catch(error => {
                console.log(error)
                setErrorMsg(error.msg)
            })
        }
    }

    if (state.isAuthenticated){
        history.push("/")
    }


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
                <button className="authButton" onClick={(e) => handleSubmit(e)}>{login ? "Login" : "Sign Up"}</button>
            </div>
        </div>
    )
}

export default Auth
