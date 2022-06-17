import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { withCookies } from "react-cookie";
import { ToastContainer } from "react-toastify";

import { Layout, Loader } from "../";
import routes from "../../config/routes";
import { authApi } from "../../redux/services/auth";
import { getUserSelector } from "../../redux/features/authSlice";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(getUserSelector);

  // Get User
  useEffect(() => {
    if (!isAuth) return;
    dispatch(authApi.endpoints.getUser.initiate(null));
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
          {routes.map(({ path, component: Component, ...rest }) => (
            <Route key={path} path={path} element={<Component />} {...rest} />
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
