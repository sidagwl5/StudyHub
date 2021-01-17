import React from "react";
import { useSelector } from "react-redux";
import Button from '../presentation/button';

const Navbar = () => {
  const userData = useSelector((state) => state.user);

  const handleClick = () => {
     console.log('clicked');
  }

  return userData ? <Button title="Log Out" handleClick={handleClick} /> : null
}

export default Navbar;
