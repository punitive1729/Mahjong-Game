import { useEffect, useState, createContext } from 'react';
import { TILES_NAMES } from './../utils/constants';
export const CardsContext = createContext({
  firstRevealedCard: null,
  secondRevealedCard: null,
  allTiles: [],
});

export const CardsContextProvider = ({ children }) => {
  const [firstRevealedCard, setFirstRevealedCard] = useState(null);
  const [secondRevealedCard, setSecondRevealedCard] = useState(null);
  const [allTiles, setAllTiles] = useState([]);

  const getAllTiles = () => {
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
  };

  if (allTiles.length === 0) {
    getAllTiles();
  }

  const addNewCard = (card) => {
    if (firstRevealedCard && secondRevealedCard) return;
    if (firstRevealedCard) {
      setSecondRevealedCard(card);
      setTimeout(() => {
        setSecondRevealedCard(null);
      }, 2000);
    } else {
      setFirstRevealedCard(card);
      setTimeout(() => {
        setFirstRevealedCard(null);
      }, 2000);
    }
  };

  useEffect(() => {
    let matchedImage = null;
    if (
      firstRevealedCard &&
      secondRevealedCard &&
      firstRevealedCard.id !== secondRevealedCard.id &&
      firstRevealedCard.image === secondRevealedCard.image
    ) {
      matchedImage = firstRevealedCard.image;
    }
    const newAllTiles = allTiles.map((tile) => {
      if (tile.image === matchedImage) {
        setFirstRevealedCard(null);
        setSecondRevealedCard(null);
        return {
          ...tile,
          hasMatched: true,
          isBack: false,
        };
      }
      if (
        (firstRevealedCard && tile.id === firstRevealedCard.id) ||
        (secondRevealedCard && secondRevealedCard.id === tile.id)
      ) {
        if (tile.hasMatched === true) return { ...tile };
        return { ...tile, isBack: false };
      }
      return { ...tile, isBack: true };
    });
    setAllTiles(newAllTiles);
  }, [firstRevealedCard, secondRevealedCard]);

  const value = {
    allTiles,
    addNewCard,
  };

  return (
    <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
  );
};
