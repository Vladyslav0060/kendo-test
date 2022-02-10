import { observer } from "mobx-react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AddUserDialog from "./components/AddUserDialog";
import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";

const App = () => {
  return (
    <Router>
      <AddUserDialog />
      <Navbar />
      <AppRoutes />
    </Router>
  );
};
const AppObservable = observer(App);

export default AppObservable;
