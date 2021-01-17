import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../../store/actions/user";

const Home = () => {
  
  const userData = useSelector(state => state.user);  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);

  return (
    <div>
      <p>Home</p>
      <button>Click me</button>
    </div>
  );
};

export default Home;
