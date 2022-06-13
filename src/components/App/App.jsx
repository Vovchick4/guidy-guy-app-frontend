import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { Layout, Loader } from "../";

import routes from "../../config/routes";

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
          {routes.map(({ path, component: Component, ...rest }) => (
            <Route key={path} path={path} element={<Component />} {...rest} />
          ))}
        </Route>
      </Routes>
    </Suspense>
  );
}
