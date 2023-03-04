import { FRONT_TILE_NAME } from './../../utils/constants';
import './card.styles.scss';
function Card(props) {
  const { image, isBack, hasMatched } = props.card;

  return (
    <div
      className='card-container'
      onClick={() => {
        if (isBack === true && hasMatched === false)
          props.customClickEvent(props.card.id);
      }}
    >
      {isBack && !hasMatched ? (
        <img
          src={`./tiles/${FRONT_TILE_NAME}`}
          alt={props.card}
          className='card-image'
        />
      ) : (
        <img src={`./tiles/${image}`} alt={props.card} className='card-image' />
      )}
    </div>
  );
}

export default Card;
