import './game-board.styles.scss';
import Card from './../cards/card.component';
import { useEffect, useState } from 'react';
import Play from '../Play/play.component';
import { TILES_NAMES } from './../../utils/constants';

const GameBoard = () => {
  const [playClicked, setPlayClicked] = useState(false);
  const [gameState, setGameState] = useState({});

  useEffect(() => {
    const tiles = [...TILES_NAMES, ...TILES_NAMES];
    tiles.sort(() => Math.random() - 0.5);
    const newAllTiles = tiles.map((tile, index) => {
      return {
        isBack: true,
        image: tile,
        id: index,
        hasMatched: false,
      };
    });
    setGameState({
      allTiles: newAllTiles,
      firstRevealedCard: null,
      secondRevealedCard: null,
    });
  }, []);

  const flipCardToFront = (id, cardNumber) => {
    if (gameState.allTiles[id].hasMatched === true) return;
    const newGameState = { ...gameState };
    if (cardNumber === 1) newGameState.firstRevealedCard = id;
    else newGameState.secondRevealedCard = id;
    newGameState.allTiles[id] = { ...newGameState.allTiles[id], isBack: false };
    setGameState(newGameState);
  };

  const matched = (id1, id2) => {
    console.log('Map..', id1, id2);
    const newGameState = {
      firstRevealedCard: null,
      secondRevealedCard: null,
      allTiles: [...gameState.allTiles],
    };
    newGameState.allTiles[id1].isBack = false;
    newGameState.allTiles[id2].isBack = false;
    newGameState.allTiles[id1].hasMatched = true;
    newGameState.allTiles[id2].hasMatched = true;
    setGameState(newGameState);
  };

  useEffect(() => {
    const { firstRevealedCard, secondRevealedCard } = gameState;
    if (
      firstRevealedCard !== null &&
      secondRevealedCard !== null &&
      firstRevealedCard !== secondRevealedCard &&
      gameState.allTiles[firstRevealedCard].image ===
        gameState.allTiles[secondRevealedCard].image
    )
      matched(firstRevealedCard, secondRevealedCard);
  }, [gameState]);

  const flipCardToBack = (cardId, cardNumber, currGameState) => {
    if (cardNumber === 1 && currGameState.firstRevealedCard !== cardId)
      return currGameState;
    if (cardNumber === 2 && currGameState.secondRevealedCard !== cardId)
      return currGameState;
    const newGameState = { ...currGameState };
    if (cardNumber === 1) newGameState.firstRevealedCard = null;
    else newGameState.secondRevealedCard = null;
    newGameState.allTiles[cardId] = {
      ...newGameState.allTiles[cardId],
      isBack: true,
    };
    return newGameState;
  };

  const flippingCard = (cardId, revealedCardNo) => {
    flipCardToFront(cardId, revealedCardNo);
    setTimeout(
      () =>
        setGameState((gameState) =>
          flipCardToBack(cardId, revealedCardNo, gameState)
        ),
      1700
    );
  };

  const handleCardClick = (id) => {
    if (gameState.firstRevealedCard === null) return flippingCard(id, 1);
    else if (gameState.secondRevealedCard === null) flippingCard(id, 2);
  };

  return (
    <div className='game-board-container'>
      {playClicked ? (
        <div className='tiles-container'>
          {gameState.allTiles.map((tile, index) => {
            return (
              <Card
                key={index}
                card={tile}
                customClickEvent={handleCardClick}
              />
            );
          })}
        </div>
      ) : (
        <div
          className='play-container'
          onClick={() => {
            setPlayClicked(true);
          }}
        >
          <Play />
        </div>
      )}
    </div>
  );
};

export default GameBoard;
