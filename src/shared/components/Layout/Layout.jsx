import { Outlet } from "react-router-dom";

import { Button } from "../../ui";
import { useLogoutMutation } from "../../redux/services/auth";

export default function Layout() {
  const [logOut] = useLogoutMutation();

  function userLogOut() {
    logOut();
  }

  return (
    <div>
      Layout
      <Outlet />
      <Button onClick={userLogOut}>LogOut</Button>
    </div>
  );
}
