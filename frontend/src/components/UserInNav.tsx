import React from "react";
import SignUpLogin from "./SignUpLogin";

interface UserInNavProps {
  loggedIn: boolean;
}

const UserInNav: React.FC<UserInNavProps> = ({ loggedIn }) => {
  return (
    <>
      {loggedIn ? (
        <>
          <SignUpLogin />
          {/* going to add logout */}
        </>
      ) : (
        <>
          <SignUpLogin />
        </>
      )}
    </>
  );
};

export default UserInNav;
