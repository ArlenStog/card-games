import React from "react";
import { useState, useEffect } from "react";

import Table from "../../components/table";
import Bet from "../../components/bet";

import "./styles.scss";

const BlackJack = () => {
  const [cash, setCash] = useState(0);

  useEffect(() => {
    setCash(1000);
  }, []);
  return (
    <div className="black-jack">
      <p className="current">Current money: {cash}</p>
      <Table/>
      <Bet/>
    </div>
  );
};

export default BlackJack;
