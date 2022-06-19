import { isEmpty } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import urls from "../../config/urls";
import { getUserSelector } from "../../redux/features/authSlice";

export default function PublicRoute({ children, ...rest }) {
  const user = useSelector(getUserSelector);

  return (
    <React.Fragment>
      {!isEmpty(user) && rest?.restricted ? (
        <Navigate to={urls.home} />
      ) : (
        children
      )}
    </React.Fragment>
  );
}
