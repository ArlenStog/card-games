import React from "react";

import Table from "../../components/table";
import Bet from "../../components/bet";

import "./styles.scss";

const BlackJack = () => {
  
  return (
    <div className="black-jack">
      <Table/>
      <Bet/>
    </div>
  );
};

export default BlackJack;
