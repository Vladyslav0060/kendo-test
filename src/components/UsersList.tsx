import { FC, useState } from "react";
import appStore from "../stores/AppStore";
import { useEffect } from "react";
import { IUser } from "../types/types";
import "@progress/kendo-theme-default/dist/all.css";
import {
  CompositeFilterDescriptor,
  filterBy,
  orderBy,
  SortDescriptor,
} from "@progress/kendo-data-query";
import {
  Grid,
  GridColumn,
  GridSortChangeEvent,
  GridCellProps,
  GridRowProps,
  GridFilterOperators,
  GridFilterChangeEvent,
} from "@progress/kendo-react-grid";
import httpService from "../httpService/httpService";
import React from "react";
import { Link } from "react-router-dom";
import { Loader } from "@progress/kendo-react-indicators";
const initialFilter: CompositeFilterDescriptor = {
  logic: "and",
  filters: [{ field: "userName", operator: "contains", value: "" }],
};
const initialSort: Array<SortDescriptor> = [{ field: "userName", dir: "asc" }];
const UsersList: FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [sort, setSort] = useState(initialSort);
  const [filter, setFilter] = useState(initialFilter);
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
  useEffect(() => {
    fetchData();
  }, [appStore]);
  const cellBoolean = (props: GridCellProps) => {
    const enabledToString = props.dataItem.enabled ? "Yes" : "No";
    return <td>{enabledToString}</td>;
  };
  const rowRender = (
    trElement: React.ReactElement<HTMLTableRowElement>,
    props: GridRowProps
  ) => {
    const green = { backgroundColor: "rgb(55, 180, 0,0.32)" };
    const red = { backgroundColor: "rgb(243, 23, 0, 0.32)" };
    const trProps: any = { style: props.dataItem.enabled ? green : red };
    return React.cloneElement(
      trElement,
      { ...trProps },
      trElement.props.children
    );
  };
  const filterOperators: GridFilterOperators = {
    text: [{ text: "grid.filterContainsOperator", operator: "contains" }],
    numeric: [{ text: "grid.filterEqOperator", operator: "eq" }],
    date: [{ text: "grid.filterEqOperator", operator: "eq" }],
    boolean: [{ text: "grid.filterEqOperator", operator: "eq" }],
  };
  const userNameCell = (e: any) => {
    const link = "/details/" + e.dataItem.userName;
    return (
      <td>
        <Link to={link}>{e.dataItem.userName}</Link>
      </td>
    );
  };
  return (
    <div className="wrapper">
      {users.length ? (
        <Grid
          data={filterBy(orderBy(users, sort), filter)}
          sort={sort}
          sortable={true}
          onSortChange={(e: GridSortChangeEvent) => {
            setSort(e.sort);
          }}
          onFilterChange={(e: GridFilterChangeEvent) => setFilter(e.filter)}
          rowRender={rowRender}
          filterable={true}
          filter={filter}
          filterOperators={filterOperators}
        >
          <GridColumn field="userName" title="Username" cell={userNameCell} />
          <GridColumn field="fullName" title="Full name" filterable={false} />
          <GridColumn
            field="lastLogin"
            format="{0:dd MMM yyyy, hh:mm}"
            title="Last login"
            filterable={false}
          />
          <GridColumn
            field="enabled"
            title="Enabled"
            cell={cellBoolean}
            filterable={false}
          />
        </Grid>
      ) : (
        <div className="spinner-centered">
          <Loader size="medium" type="converging-spinner" />
        </div>
      )}
    </div>
  );
};
export default UsersList;
