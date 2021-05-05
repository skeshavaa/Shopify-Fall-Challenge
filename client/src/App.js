import './App.css';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Landing from './pages/Landing';
import './styles/font.css'
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import { useReducer } from 'react'
import React, { createContext } from 'react'
import Profile from './pages/Profile';

export const AuthContext = createContext();
const initialState = {
    isAuthenticated: false,
    user: null,
    token: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", JSON.stringify(action.payload.token));
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            }
        case "LOGOUT":
            localStorage.clear();
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        default: 
            return state;
    }
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Route path="/" exact component={Landing}/>
          <Route path="/auth" exact component={Auth}/>
          <Route path="/profile" exact component={Profile}/>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
