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
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [checkBet, setCheckBet] = useState(false);
  const [checkDeal, setCheckDeal] = useState(false);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [dealerPoints, setDealerPoints] = useState(0);
  const handleClick = (bet) => {
    if (currentMoney >= bet) {
      setCurrentMoney(currentMoney - bet);
      setBetMoney(betMoney + bet);
    }
    if (currentMoney < bet) {
      setCurrentMoney(0);
      setBetMoney(betMoney + currentMoney);
    }
    setCheckBet(true);
  };

  const dealCards = async () => {
    const response = await axios.get(
      `https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`
    );
    const dealerResponse = await axios.get(
      `https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`
    );
    if (dealerResponse.status === 200 && response.status === 200) {
      setPlayerCards(response.data.cards);
      setDealerCards(dealerResponse.data.cards);
    }
  };
  const handleHitClick = async () => {
    const response = await axios.get(
      `https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
    );
    if (response.status === 200) {
      setPlayerCards((oldCards) => [...oldCards, response.data.cards[0]]);
    }
  };
  
  const dealerDraw = async() =>{
    const response = await axios.get(
      `https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
    );
    if (response.status === 200) {
      setDealerCards((oldCards) => [...oldCards, response.data.cards[0]]);
    }
  }

  const handleStandClick = () =>{
    
    if(dealerPoints < 17){
      dealerDraw();
    }

    if((dealerPoints > playerPoints && dealerPoints < 21) || dealerPoints===21){
      alert('you lost');
      newGame(0);
    }
    if(dealerPoints < playerPoints){
      alert('you win');
      newGame(1);
    }
    if(dealerPoints ===playerPoints){
      alert('tie');
      newGame(2);
    }
  };
  
  const handleDealClick = async () => {
    setCheckBet(false);
    setCheckDeal(true);
    dealCards();
  };

  const returnValue = (value) => {
    const cardValues = {
      ACE: 11,
      KING: 10,
      QUEEN: 10,
      JACK: 10,
      10: 10,
      9: 9,
      8: 8,
      7: 7,
      6: 6,
      5: 5,
      4: 4,
      3: 3,
      2: 2,
    };
    return cardValues[value];
  };
  const calculatePlayerPoints = () => {
    setPlayerPoints(0);
    playerCards.map((card) =>
      setPlayerPoints((playerPoints) => playerPoints + returnValue(card.value))
    );
  };
  const calculateDealerPoints = () => {
    setDealerPoints(0);
    dealerCards.map((card) =>
      setDealerPoints((dealerPoints) => dealerPoints + returnValue(card.value))
    );
  };
  const checkIfLost = () => {
    if (playerPoints > 21) {
      alert('you lose');
      newGame(0);
    }
  };

  const newGame = (check) =>{
    if(check===0){
      setCheckBet(false);
      setCheckDeal(false);
      setPlayerCards([]);
      setDealerCards([]);
      setPlayerPoints(0);
      setDealerPoints(0);
      setBetMoney(0);
    }
    if(check===1){
      setCheckBet(false);
      setCheckDeal(false);
      setPlayerCards([]);
      setDealerCards([]);
      setPlayerPoints(0);
      setDealerPoints(0);
      setCurrentMoney(currentMoney => currentMoney + betMoney*2)
      setBetMoney(0);
    }
    if(check===2){
      setCheckBet(false);
      setCheckDeal(false);
      setPlayerCards([]);
      setDealerCards([]);
      setPlayerPoints(0);
      setDealerPoints(0);
      setCurrentMoney(currentMoney => currentMoney + betMoney)
      setBetMoney(0);
    }

  }
  useEffect(() => {
    dispatch(cardsAll());
    setCurrentMoney(1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    calculatePlayerPoints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerCards]);
  useEffect(() => {
    calculateDealerPoints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dealerCards]);
  useEffect(() => {
    checkIfLost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerPoints,playerCards]);
  return (
    <div className="table-and-bet">
      <div className="table">
        <div className="money">
          <div className="current-money">
            <AttachMoneyRoundedIcon sx={{ fontSize: 40 }} />
            {currentMoney}
          </div>
          <div className="cards">
            <div className="points">{dealerPoints}</div>
            {dealerCards.map((card, index) => (
              <div className="card" key={index}>
                <img alt="card" src={card.image} />
              </div>
            ))}
          </div>

          <div className="bet-money">
            <AttachMoneyRoundedIcon sx={{ fontSize: 40 }} />
            {betMoney}
          </div>
        </div>
        <div className="buttons">
          <div className="cards">
            <div className="points">{playerPoints}</div>
            {playerCards.map((card, index) => (
              <div className="card" key={index}>
                <img alt="card" src={card.image} />
              </div>
            ))}
          </div>
          {checkBet ? (
            <Button
              className="button"
              variant="contained"
              size="large"
              sx={{ fontSize: 30 }}
              onClick={handleDealClick}
            >
              DEAL
            </Button>
          ) : null}
        </div>
      </div>
      {checkDeal ? (
        <div className="button-group">
          <Button
            className="button"
            variant="contained"
            size="large"
            sx={{ fontSize: 30 }}
            onClick={handleHitClick}
          >
            HIT
          </Button>{" "}
          <Button
            className="button"
            variant="contained"
            size="large"
            sx={{ fontSize: 30 }}
            onClick={handleStandClick}
          >
            STAND
          </Button>{" "}
          <Button
            className="button"
            variant="contained"
            size="large"
            sx={{ fontSize: 30 }}
          >
            DOUBLE
          </Button>{" "}
        </div>
      ) : (
        <Bet handleClick={handleClick} />
      )}
    </div>
  );
};

export default Table;
