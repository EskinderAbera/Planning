import KPIList from "./components/KPIList";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router,Routes, Route, Link, Navigate} from 'react-router-dom';

import { APIContextProvider } from './contexts/KPIContext';

function App() {
  return (
    <div className="container-xl">
    <div className="table-responsive">
      <div className="table-wrapper">  
      <APIContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route exact path="/login" element = { <Login />}></Route>
            <Route exact path="/landing" element = { <LandingPage />}></Route>
            <Route exact path="/kpi" element = { <KPIList /> }></Route>
          </Routes>
        </Router>
      </APIContextProvider>    
      </div>
    </div>
  </div>
  );
}

export default App;
