import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import { Button } from "@mui/material";

import "./styles.scss";
import Bet from "../bet";
import { cardsAll } from "../../redux/blackjack/cards.slice";
import axios from "axios";

const Table = () => {
  const dispatch = useDispatch();
  const [currentMoney, setCurrentMoney] = useState(0);
  const [betMoney, setBetMoney] = useState(0);
  const deck_id = useSelector((state) => state.deck_id);
  const [cards, setCards] = useState([])

  const handleClick = (bet) => {
    if (currentMoney >= bet) {
      setCurrentMoney(currentMoney - bet);
      setBetMoney(betMoney + bet);
    }
    if (currentMoney < bet) {
      setCurrentMoney(0);
      setBetMoney(betMoney + currentMoney);
    }
  };

  const dealCards = async() => {
    const response = await axios.get(
      `https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`
    );
    if (response.status === 200) {
      setCards(response.data.cards)
    }
  }

  useEffect(() => {
    dispatch(cardsAll());
    setCurrentMoney(1000);
  }, []);

  console.log(cards);

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
          <div className="cards" >
            {
              cards.map((card, index) => 
                <div className="card" key={index} >
                  <img alt="card" src={card.image} />
                </div>
              )
            }
          </div>
          <Button
            className="button"
            variant="contained"
            size="large"
            sx={{ fontSize: 30 }}
            onClick={dealCards}
          >
            DEAL
          </Button>
        </div>
      </div>
      <Bet handleClick={handleClick} />
    </div>
  );
};

export default Table;
