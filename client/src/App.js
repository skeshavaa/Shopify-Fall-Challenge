import './App.css';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Landing from './pages/Landing';
import './styles/font.css'
import Navbar from './components/Navbar';
import Auth from './pages/Auth';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Route path="/" exact component={Landing}/>
        <Route path="/auth" exact component={Auth}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
