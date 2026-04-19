import { Outlet } from "react-router-dom";
import React from 'react';
import MyNavBar from '../../components/MyNavBar';
import { Navigate } from "react-router-dom";

const MainLayout = () => {

  if (!localStorage.getItem("access")) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <MyNavBar/>
      <Outlet/>
    </>
  );
};

export default MainLayout;
