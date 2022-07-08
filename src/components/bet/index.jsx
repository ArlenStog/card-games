import React from "react";
import { ReactComponent as Chip5 } from '../../assets/chip5.svg'
import { ReactComponent as Chip10 } from '../../assets/chip10.svg'
import { ReactComponent as Chip15 } from '../../assets/chip15.svg'
import { ReactComponent as Chip50 } from '../../assets/chip50.svg'
import { ReactComponent as Chip100 } from '../../assets/chip100.svg'

import "./styles.scss";

const Bet = () => {
  return (
    <div className="bet">
      <Chip5 className="chip"/>
      <Chip10 className="chip"/>
      <Chip15 className="chip"/>
      <Chip50 className="chip"/>
      <Chip100 className="chip"/>
    </div>
  );
};

export default Bet;
