import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { Layout } from "../";

import routes from "../../config/routes";

export default function App() {
  return (
    <Suspense fallback={<span>Load</span>}>
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
