import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Loader from "../components/Loader";

function Layout() {
  return (
    <div>
      <NavBar />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default Layout;
