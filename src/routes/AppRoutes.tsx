import { Routes, Route } from "react-router";
import UsersList from "../components/UsersList";
import Details from "../components/Details";
import NotFound from "../components/NotFound";
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<UsersList />}></Route>
    <Route path="/details/:userId" element={<Details />}></Route>
    <Route path="*" element={<NotFound />}></Route>
  </Routes>
);
export default AppRoutes;
