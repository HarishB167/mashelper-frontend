import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import NavBar from "./components/common/navBar";
import Home from "./components/home";

function App() {
  return (
    <div className="main-container">
      <ToastContainer />
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </div>
  );
}

export default App;
