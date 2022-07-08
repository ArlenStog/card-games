import React from "react";

import "./styles.scss";

const Bet = () => {
  return (
    <div className="bet">
      <button className="chip"> 50 </button>

      <button className="chip"> 100 </button>

      <button className="chip"> 200 </button>

      <button className="chip"> 500 </button>

      <button className="chip"> 1000 </button>
    </div>
  );
};

export default Bet;
