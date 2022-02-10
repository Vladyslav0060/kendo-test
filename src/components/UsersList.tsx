import { FC, useState } from "react";
import appStore from "../stores/AppStore";
import { useEffect } from "react";
import { IUser } from "../types/types";
import "@progress/kendo-theme-default/dist/all.css";
import { SortDescriptor } from "@progress/kendo-data-query";
import httpService from "../httpService/httpService";
import { LoaderMedium } from "./loaders/Loaders";
import { DataGrid } from "./grid/DataGrid";
const initialSort: Array<SortDescriptor> = [{ field: "userName", dir: "asc" }];
const UsersList: FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [sort, setSort] = useState(initialSort);
  const [filter, setFilter] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await httpService.get("/users", {
        headers: {
          Autorization: "Bearer johndoe",
          "Content-Type": "application/json",
        },
      });
      appStore.users = response?.data.users;
      const result = response?.data.users.map((el: IUser) => {
        el["lastLogin"] = new Date(el["lastLogin"]);
        return el;
      });
      setUsers(result);
    };
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      {users.length ? (
        <DataGrid
          users={users}
          setSort={setSort}
          setFilter={setFilter}
          sort={sort}
          filter={filter}
        />
      ) : (
        <LoaderMedium />
      )}
    </div>
  );
};
export default UsersList;
