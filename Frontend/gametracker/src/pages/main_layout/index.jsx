import { Outlet, Link } from "react-router-dom";
import React from 'react';
import MyNavBar from '../../components/MyNavBar';

const MainLayout = () => {
  return (
    <>
      <MyNavBar />
      <Outlet />
    </>
  );
};

export default MainLayout;
