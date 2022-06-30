import React, { Suspense, useEffect } from "react";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { withCookies } from "react-cookie";
import { ToastContainer } from "react-toastify";

import {
  Layout,
  Loader,
  PublicRoute,
  PrivateRoute,
} from "../shared/components";
import routes from "../shared/config/routes";
import { authApi } from "../shared/redux/services/auth";
import { getUserSelector } from "../shared/redux/features/authSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);

  // Get User
  useEffect(() => {
    // if (isEmpty(user)) return;
    dispatch(authApi.endpoints.getUser.initiate(null));
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
          {routes.map(({ path, component: Component, ...rest }) => (
            <Route
              key={path}
              path={path}
              element={
                rest.private ? (
                  <PrivateRoute {...rest}>
                    <Component />
                  </PrivateRoute>
                ) : (
                  <PublicRoute {...rest}>
                    <Component />
                  </PublicRoute>
                )
              }
              {...rest}
            />
          ))}
        </Route>
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Suspense>
  );
}

export default withCookies(App);
