import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import About from "./components/about";
import NavBar from "./components/common/navBar";
import CSVDataDownloadForm from "./components/CSVDataDownloadForm";
import EditItemForm from "./components/editItemForm";
import Home from "./components/home";
import ViewData from "./components/viewData";

function App() {
  return (
    <div className="main-container">
      <ToastContainer />
      <NavBar />
      <Switch>
        <Route path="/view-data" exact component={ViewData} />
        <Route path="/edit-data/:id" exact component={EditItemForm} />
        <Route
          path="/download-csv-data"
          exact
          component={CSVDataDownloadForm}
        />
        <Route path="/about" exact component={About} />
        <Route path="/" exact component={Home} />
      </Switch>
    </div>
  );
}

export default App;
