import React from "react";
import { Navigate } from "react-router-dom";

import urls from "../../config/urls";
import { useGetUserQuery } from "../../redux/services/auth";

export default function PrivateRoute({ children, ...rest }) {
  const { data, isLoading } = useGetUserQuery();

  if (isLoading) return;

  if (rest.admin) {
    return (
      <React.Fragment>
        {data && data.role === "admin" ? children : <Navigate to={urls.home} />}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        {!data ? <Navigate to={urls.home} /> : children}
      </React.Fragment>
    );
  }
}
