import React from "react";
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-react-layout";
import { Link } from "react-router-dom";
import appStore from "../stores/AppStore";

const Navbar: React.FC = () => {
  const toggleDialog = () => {
    appStore.setIsDialogOpen(!appStore.isDialogOpen);
  };
  return (
    <React.Fragment>
      <AppBar>
        <AppBarSpacer
          style={{
            width: 4,
          }}
        />

        <AppBarSection>
          <Link to="/">
            <h1 className="title">Logo</h1>
          </Link>
        </AppBarSection>

        <AppBarSpacer
          style={{
            width: 32,
          }}
        />

        <AppBarSection>
          <ul>
            <li>
              <Link to="/">Users</Link>
            </li>
            <li>
              <Link to="#" onClick={toggleDialog}>
                New user
              </Link>
            </li>
          </ul>
        </AppBarSection>

        <AppBarSpacer />
      </AppBar>
      <style>{`
              body {
                  background: #dfdfdf;
              }
              .title {
                  font-size: 18px;
                  margin: 0;
              }
              .title:hover{
                  cursor:pointer;
                  color:red;
              }
              ul {
                  font-size: 14px;
                  list-style-type: none;
                  padding: 0;
                  margin: 0;
                  display: flex;
              }

              a {
                  text-decoration:none !important;
                  color: black;
                  border:none;
                  background-color:transparent;
              }
              li {
                  margin: 0 10px;
              }
              li a:hover {
                  color: red;
              }
              li:hover {
                  cursor: pointer;
                  color: #84cef1;
              }
              .k-button k-button-md k-rounded-md k-button-solid k-button-solid-base {
                  padding: 0;
              }
              .k-badge-container {
                  margin-right: 8px;
              }
          `}</style>
    </React.Fragment>
  );
};
export default Navbar;
