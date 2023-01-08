import { Route, Routes } from 'react-router-dom';
import GameBoard from './components/game-board/game-board.component';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<GameBoard />}></Route>
    </Routes>
  );
};

export default App;
