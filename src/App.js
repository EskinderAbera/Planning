import KPIList from "./components/KPIList";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router,Routes, Route, Link, Navigate} from 'react-router-dom';
import Protected from "./components/Protected";
import { APIContextProvider } from './contexts/KPIContext';
import { useState } from "react";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(null);
  return ( 
      <APIContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to="/landing" />} />
            <Route exact path="/login" element = { <Login />}></Route>
            <Route exact path="/landing" element = { <LandingPage />}></Route>
            <Route exact path="/kpi" element = { <KPIList /> }></Route>
          </Routes>
        </Router>
      </APIContextProvider>    
  );
}

export default App;
