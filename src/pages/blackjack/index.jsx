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
      <Table></Table>
      <p className="money"> current money: {cash}</p>
      <Bet></Bet>
    </div>
  );
};

export default BlackJack;
