
import { Route, BrowserRouter as Router, Routes   } from "react-router-dom";
import Home from "./components/Home";
import Account from "./components/Account";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Discussion from "./components/Discussion"
import "./App.css";


function App() {

  return (
    <div className="App ">



      <Router>
          <Routes >
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/edit" element={<Account/>}/>
              <Route exact path="/new" element={<Discussion/>}/>
              <Route exact path="/login" element={<Login/>}/>
              <Route exact path="/register" element={<SignUp/>}/>
          </Routes  >
      </Router>
    </div>
  );
}

export default App;
