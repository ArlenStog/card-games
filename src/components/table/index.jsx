import React, { useEffect, useState } from "react";
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';

import './styles.scss';

const Table = () =>{
  const [currentMoney, setCurrentMoney] = useState(0);
  const [deckId, setDeckId] = useState('');
  
  useEffect(() => {
    setCurrentMoney(1000);
  }, []);

  return(
    <div className="table">
      <p className="current-money"><AttachMoneyRoundedIcon sx={{ fontSize: 40 }}/>{currentMoney}</p>
    </div>
  )
}

export default Table;
