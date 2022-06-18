import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { withCookies } from "react-cookie";
import { ToastContainer } from "react-toastify";

import { Layout, Loader, PublicRoute, PrivateRoute } from "../";
import routes from "../../config/routes";
import { authApi } from "../../redux/services/auth";

function App() {
  const dispatch = useDispatch();

  // Get User
  useEffect(() => {
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
