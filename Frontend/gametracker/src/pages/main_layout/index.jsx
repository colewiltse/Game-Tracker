import { Outlet, Link } from "react-router-dom";
import React from 'react';
import MyNavBar from '../../components/MyNavBar';
import { Navigate } from "react-router-dom";

const MainLayout = ({isLoggedIn, setIsLoggedIn}) => {


  if (!localStorage.getItem("access")) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <MyNavBar setIsLoggedIn={setIsLoggedIn}/>
      <Outlet />
    </>
  );
};

export default MainLayout;
