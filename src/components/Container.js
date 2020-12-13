import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import Sider from "./Sider";
import View from "./View";
import axios from "axios";
import { useDispatch } from "react-redux";

function Container() {
  const dispatch = useDispatch();

  const fetchUsers = async () => {
    const response = await axios.get("http://sample.bmaster.kro.kr/contacts");
    dispatch({
      type: "LOAD_USER",
      response,
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="center-container">
        <Sider />
        <Route path="/user/addUser" component={Content} exact />
        <Route path="/user/View/:no" component={View} exact />
      </div>
      <Footer />
    </div>
  );
}

export default Container;
