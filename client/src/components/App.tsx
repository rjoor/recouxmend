import React from "react";
import { Component } from "react";
import { Navigate, redirect } from "react-router";
import { Route, Routes } from "react-router-dom";
import ApiTest from "./ApiTest";
import Home from "./Home";
import Login from "./Login";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Routes>
          <Route path="/" element={<ApiTest />} />
          <Route path="login" element={<Login />} />
          <Route path="callback" element={<Home />} />
        </Routes>
      </React.Fragment>
    );
  }
}

export default App;
