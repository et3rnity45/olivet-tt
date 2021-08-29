/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

export default function ProtectedRoute({
  ...routeProps
}: RouteProps): JSX.Element {
  if (localStorage.token) {
    return <Route {...routeProps} />;
  }
  return <Redirect to={{ pathname: "/login" }} />;
}
