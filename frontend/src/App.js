import QuestionFile from './components/QuestionFile';
import QuestionText from './components/QuestionText';
import Navbar from "./components/NavBar";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import { useEffect, useState } from 'react';
import Popup from './components/Popup';




function App() {

  const [timedPopup, setTimedPopup] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimedPopup(true);
    }, 5000);  
  }, [])

  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Navbar/>
        <Popup trigger={timedPopup} setTrigger={setTimedPopup} />

        <Routes>
          <Route exact path="/" element = {<QuestionText/>}/>
          <Route exact path="/file" element = {<QuestionFile/>}/>
        </Routes>
      </Router>

      </header>
    </div>
  );
}

export default App;
