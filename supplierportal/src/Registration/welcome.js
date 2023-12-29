import React from 'react';
import { useSelector } from "react-redux";
import { selectLoginUser } from './login.selector';

const WelcomePage = () => {
    const selectedLoginUser = useSelector(selectLoginUser);

  return (
    <div>
      <h2>Welcome to the Dashboard!</h2>
      <h3>{selectedLoginUser?.token}</h3>
    </div>
  );
};

export default WelcomePage;
