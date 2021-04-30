import './App.css';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Landing from './pages/Landing';
import './styles/font.css'
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Route path="/" exact component={Landing}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
