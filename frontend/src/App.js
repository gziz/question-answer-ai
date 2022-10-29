import QuestionFile from './components/QuestionFile';
import QuestionText from './components/QuestionText';
import Navbar from "./components/NavBar";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Navbar/>

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
