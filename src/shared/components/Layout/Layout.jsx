import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

import { Navbar } from "../";
import { Button } from "../../ui";

import { useLogoutMutation } from "../../redux/services/auth";

export default function Layout() {
  const [logOut] = useLogoutMutation();

  function userLogOut() {
    logOut();
  }

  return (
    <div>
      <Navbar />

      <div className={styles.layout_container}>
        <Outlet />
        <Button onClick={userLogOut}>LogOut</Button>
      </div>
    </div>
  );
}
