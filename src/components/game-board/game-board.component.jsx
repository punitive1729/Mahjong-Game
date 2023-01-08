import './game-board.styles.scss';
import Card from './../cards/card.component';
import { useState } from 'react';
import { CardsContext } from '../../contexts/cards.context';
import Play from '../Play/play.component';
import { useContext } from 'react';
const GameBoard = () => {
  const { allTiles } = useContext(CardsContext);
  const [playClicked, setPlayClicked] = useState(false);
  return (
    <div className='game-board-container'>
      {playClicked ? (
        <div className='tiles-container'>
          {allTiles.map((tile, index) => {
            return <Card key={index} card={tile} />;
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
