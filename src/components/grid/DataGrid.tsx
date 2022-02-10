import { filterBy, orderBy } from "@progress/kendo-data-query";
import {
  Grid,
  GridColumn,
  GridSortChangeEvent,
  GridCellProps,
  GridRowProps,
  GridFilterOperators,
  GridFilterChangeEvent,
} from "@progress/kendo-react-grid";
import React from "react";
import { Link } from "react-router-dom";

export const DataGrid = (props: any) => {
  const { sort, setSort, setFilter, users, filter } = props;
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
        <Link className="user-link" to={link}>
          {e.dataItem.userName}
        </Link>
      </td>
    );
  };
  return (
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
  );
};
