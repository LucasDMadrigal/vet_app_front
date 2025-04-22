import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

const RoutesAuthAdmin = (route) => {

  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const isAdmin = useSelector((state) => state.auth.rol === "ROLE_ADMIN");

//   console.log(loggedIn)
//   console.log(isAdmin)

  return loggedIn && isAdmin && <Route path={route.path} key={route.key} element={route.element} />;
};

export default RoutesAuthAdmin;



/* 
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Route } from 'react-router-dom';


const RoutesAuthAdmin = (route) => {

    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const isAdmin = useSelector((state) => state.auth.user.isAdmin);

    const Element = () => {
        if (!loggedIn) {
            return <Navigate to="/Login" />;
        }

        if (!isAdmin) {
            return <Navigate to="/auth/account" />;
        }

        return route.element;
    }; 


    return <Route path={route.path} key={route.key} element={<Element />} />;
}

export default RoutesAuthAdmin */