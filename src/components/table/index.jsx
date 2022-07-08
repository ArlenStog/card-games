import React, { useEffect, useState } from "react";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";

import "./styles.scss";
import Bet from "../bet";
import { Button } from "@mui/material";

const Table = () => {
  const [currentMoney, setCurrentMoney] = useState(0);
  const [betMoney, setBetMoney] = useState(0)

  const handleClick = (bet) => {
    if (currentMoney >= bet) {
      setCurrentMoney(currentMoney - bet)
      setBetMoney(betMoney + bet);
    }
    if (currentMoney < bet) {
      setCurrentMoney(0);
      setBetMoney(betMoney + currentMoney);
    }
  };

  useEffect(() => {
    setCurrentMoney(1000);
  }, []);

  return (
    <div className="table-and-bet">
      <div className="table">
        <div className="money">
          <div className="current-money">
            <AttachMoneyRoundedIcon sx={{ fontSize: 40 }} />
            {currentMoney}
          </div>
          <div className="bet-money">
            <AttachMoneyRoundedIcon sx={{ fontSize: 40 }} />
            {betMoney}
          </div>
        </div>
        <div className="buttons">
          <Button className="button" variant="contained" size="large" sx={{ fontSize: 30 }} >DEAL</Button>
        </div>
      </div>
      <Bet handleClick={handleClick} />
    </div>
  );
};

export default Table;
