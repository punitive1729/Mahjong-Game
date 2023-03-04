import './game-board.styles.scss';
import Card from './../cards/card.component';
import { useEffect, useState } from 'react';
import Play from '../Play/play.component';
import { TILES_NAMES } from './../../utils/constants';

const GameBoard = () => {
  const [playClicked, setPlayClicked] = useState(false);
  const [allTiles, setAllTiles] = useState([]);
  const [firstRevealedCard, setFirstRevealedCard] = useState(null);
  const [secondRevealedCard, setSecondRevealedCard] = useState(null);

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
    setAllTiles(newAllTiles);
  }, []);

  const flipCardId = (tiles, id, isBack) => {
    const newTiles = [...tiles];
    newTiles[id] = { ...newTiles[id], isBack };
    return newTiles;
  };

  const matched = (tiles, id1, id2) => {
    const newTiles = [...tiles];
    newTiles[id1] = { ...newTiles[id1], isBack: false, hasMatched: true };
    newTiles[id2] = { ...newTiles[id2], isBack: false, hasMatched: true };
    return newTiles;
  };

  useEffect(() => {
    if (firstRevealedCard != null && secondRevealedCard != null) {
      if (
        firstRevealedCard !== secondRevealedCard &&
        allTiles[firstRevealedCard].image === allTiles[secondRevealedCard].image
      ) {
        setAllTiles((allTiles) =>
          matched(allTiles, firstRevealedCard, secondRevealedCard)
        );
        setFirstRevealedCard(() => null);
        setSecondRevealedCard(() => null);
      }
    }
  }, [firstRevealedCard, secondRevealedCard]);

  const handleCardClick = (id) => {
    if (firstRevealedCard === null) {
      setFirstRevealedCard(() => id);
      setAllTiles((allTiles) => flipCardId(allTiles, id, false));
      setTimeout(() => {
        setFirstRevealedCard(() => null);
        setAllTiles((allTiles) => flipCardId(allTiles, id, true));
      }, 1500);
      return;
    }
    if (secondRevealedCard === null) {
      console.log('SRC...');
      setSecondRevealedCard(() => id);
      setAllTiles((allTiles) => flipCardId(allTiles, id, false));
      setTimeout(() => {
        setSecondRevealedCard(() => null);
        setAllTiles((allTiles) => flipCardId(allTiles, id, true));
      }, 1500);
    }
  };

  return (
    <div className='game-board-container'>
      {playClicked ? (
        <div className='tiles-container'>
          {allTiles.map((tile, index) => {
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
