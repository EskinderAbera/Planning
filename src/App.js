import KPIList from "./components/KPIList";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router,Routes, Route, Link, Navigate} from 'react-router-dom';
import Protected from "./components/Protected";
import { APIContextProvider } from './contexts/KPIContext';
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  return ( 
      <APIContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route exact path="/login" element = {<Login setIsLoggedIn = {setIsLoggedIn} />}></Route>
            <Route path="/landing" element = { <Protected isLoggedIn={isLoggedIn}><LandingPage /></Protected>}></Route>
            <Route path="/kpi" element = {<Protected isLoggedIn={isLoggedIn}><KPIList /></Protected>}></Route>
          </Routes>
        </Router>
      </APIContextProvider>    
  );
}

export default App;
