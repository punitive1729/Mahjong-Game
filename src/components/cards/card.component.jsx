import { useContext } from 'react';
import { CardsContext } from '../../contexts/cards.context';
import { FRONT_TILE_NAME } from './../../utils/constants';
import './card.styles.scss';
function Card({ card }) {
  const { addNewCard } = useContext(CardsContext);
  const { image, isBack, hasMatched } = card;
  const performFlip = () => {
    if (hasMatched || !isBack) return;
    addNewCard(card);
  };
  return (
    <div className='card-container' onClick={performFlip}>
      {isBack && !hasMatched ? (
        <img
          src={`./tiles/${FRONT_TILE_NAME}`}
          alt={card}
          className='card-image'
        />
      ) : (
        <img src={`./tiles/${image}`} alt={card} className='card-image' />
      )}
    </div>
  );
}

export default Card;
