import React from "react";
import Header from "./Header";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import "./Exchanges.css";

const Exchanges = () => {
  return (
    <>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h1> Welcome to CryptoBoss</h1>
        <Link style={{ color: 'white', textDecoration: "none", textAlign: "center" }} to="/databyyear">
          <h1 style={{ marginTop: '15rem' }}> Click To Get the Exchanges Data With Respect To Years Of Launch</h1>
        </Link>
      </div>
    </>
  );
};

export default Exchanges;
