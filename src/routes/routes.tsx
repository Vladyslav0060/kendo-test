import { Routes, Route } from "react-router";
import UsersList from "../components/UsersList";
import Details from "../components/Details";
import NotFound from "../components/NotFound";
export const routes = (
  <Routes>
    <Route path="/" element={<UsersList />}></Route>
    <Route path="/details/:userId" element={<Details />}></Route>
    <Route path="*" element={<NotFound />}></Route> //заменить на notfound
  </Routes>
);
