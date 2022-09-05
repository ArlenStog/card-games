/* eslint-disable react-hooks/exhaustive-deps */
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
  const [checkStand, setCheckStand] = useState(false);
  const [gameEnd, setGameEnd] = useState("");
  const [doubleShow, setDoubleShow] = useState(true);

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
    setDoubleShow(false);
  };

  const dealerDraw = async () => {
    const response = await axios.get(
      `https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
    );
    if (response.status === 200) {
      setDealerCards((oldCards) => [...oldCards, response.data.cards[0]]);
    }
  };

  const handleStandClick = () => {
    setCheckStand(true);
    setDoubleShow(false);
  };

  const gameWinner = () => {
    if (dealerPoints === 21) {
      setGameEnd("YOU LOSE!!!");
      return;
    }
    if (playerPoints === 21) {
      setGameEnd("YOU WIN!!!");
      return;
    }
    if (
      (playerPoints > dealerPoints && playerPoints < 22) ||
      dealerPoints > 21
    ) {
      setGameEnd("YOU WIN!!!");
    }

    if (
      (dealerPoints > playerPoints && dealerPoints < 22) ||
      playerPoints > 21
    ) {
      setGameEnd("YOU LOSE!!!");
    }
    if (
      playerPoints >= 17 &&
      dealerPoints >= 17 &&
      playerPoints === dealerPoints &&
      playerPoints < 22 && 
      dealerPoints < 22
    ) {
      setGameEnd("TIE!!!");
    }
  };

  const handleDoubleClick = () => {
    setBetMoney((betMoney) => betMoney * 2);
    handleHitClick();
    setCheckStand(true);
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
      setGameEnd("YOU LOSE!!!");
      setCheckBet(false);
    }
  };

  const newGame = (check) => {
    setCheckBet(false);
    setCheckDeal(false);
    setPlayerCards([]);
    setDealerCards([]);
    setPlayerPoints(0);
    setDealerPoints(0);
    setBetMoney(0);
    setGameEnd("");
    setCheckStand(false);
    setDoubleShow(true)
    if (check === "YOU WIN!!!")
      setCurrentMoney((currentMoney) => currentMoney + betMoney * 2);
    if (check === "TIE!!!")
      setCurrentMoney((currentMoney) => currentMoney + betMoney);
  };

  useEffect(() => {
    dispatch(cardsAll());
    setCurrentMoney(1000);
  }, []);

  useEffect(() => {
    calculatePlayerPoints();
  }, [playerCards]);

  useEffect(() => {
    calculateDealerPoints();
  }, [dealerCards]);

  useEffect(() => {
    checkIfLost();
  }, [playerPoints]);

  useEffect(() => {
    if (checkStand) {
      if (dealerPoints < 17) {
        dealerDraw();
      }
    }
  }, [checkStand, dealerPoints]);

  useEffect(() => {
    if (checkStand) {
      gameWinner();
    }
  }, [dealerPoints, playerPoints, checkStand]);
  return (
    <div className="table-and-bet">
      <div className="table">
        <div className="money">
          <div className="current-money">
            <div>${currentMoney}</div>
            {
              (gameEnd !== "") && (
                <>
            <div className="game-end">{gameEnd}</div>
            <Button
            className="button"
            variant="contained"
            onClick={() => newGame(gameEnd)}
          >
            NEW GAME
          </Button>
                </>
              )
            }

          </div>
          <div className="cards">
            {
              (dealerPoints !== 0) && <div className="dealer-points">{dealerPoints}</div>
            }
            
            {dealerCards.map((card, index) => (
              <div className="card" key={index}>
                <img alt="card" src={card.image} />
              </div>
            ))}
          </div>
          {(betMoney!==0) && <div className="bet-money">
            <AttachMoneyRoundedIcon sx={{ fontSize: 40 }} />
            {betMoney}
          </div>}
          
        </div>
        <div className="buttons">
          <div className="cards">
            {(playerPoints !==0) && <div className="points">{playerPoints}</div>}
            
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
        (gameEnd ==="") &&(
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
          {doubleShow ? (
            <Button
              className="button"
              variant="contained"
              size="large"
              sx={{ fontSize: 30 }}
              onClick={handleDoubleClick}
            >
              DOUBLE
            </Button>
          ) : null}
        </div>)
      ) : (
        <Bet handleClick={handleClick} />
      )}
    </div>
  );
};

export default Table;
