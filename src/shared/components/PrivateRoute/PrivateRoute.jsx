import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import urls from "../../config/urls";
import { getUserSelector } from "../../redux/features/authSlice";

export default function PrivateRoute({ children, ...rest }) {
  const user = useSelector(getUserSelector);

  if (rest.admin) {
    return (
      <React.Fragment>
        {user && user.role === "admin" ? children : <Navigate to={urls.home} />}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        {!user ? <Navigate to={urls.home} /> : children}
      </React.Fragment>
    );
  }
}
