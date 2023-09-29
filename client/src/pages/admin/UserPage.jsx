import React from "react";
import HomePage from "./HomePage";
import CategoryList from "../../components/admin/categories/CategoryList";
import UserList from "../../components/admin/user/UserList";

const UserPage = () => {
  return (
    <div className="flex justify-center items-center">
      <HomePage />
      <div className="p-7 text-2xl font-semibold flex-1 h-screen">
        <UserList />
      </div>
    </div>
  );
};

export default UserPage;
