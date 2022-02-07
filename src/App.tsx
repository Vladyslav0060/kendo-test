import { observer } from "mobx-react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";
import { routes } from "./routes/routes";
import AddUserDialog from "./components/AddUserDialog";

function App() {
  return (
    <div className="App">
      <Router>
        <AddUserDialog />
        <Navbar />
        {routes}
      </Router>
    </div>
  );
}
const AppObservable = observer(App);

export default AppObservable;
