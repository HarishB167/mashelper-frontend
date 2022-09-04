import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import NavBar from "./components/common/navBar";
import Home from "./components/home";
import ViewData from "./components/viewData";

function App() {
  return (
    <div className="main-container">
      <ToastContainer />
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/view-data" exact component={ViewData} />
      </Switch>
    </div>
  );
}

export default App;
