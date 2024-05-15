import { useReducer } from 'react';
import './App.css';

const ACTIONS = {
  INIT: 'init',
  PLAY: 'play',
  WON: 'won'
}

const reducer = (state, actions) => {
  switch (actions.type) {
    case ACTIONS.INIT:
      return { grid: new Array(9).fill(0), winningCell: 3, player: 1 };
    case ACTIONS.PLAY:
      let updatedGrid = [...state.grid];
      updatedGrid[actions.payload.cellIndex] = state.player;
      const updatedPlayer = state.player === 1 ? 2 : 1;
      return { ...state, player: updatedPlayer, grid: updatedGrid }
    case ACTIONS.WON:
    default:
      return state
  }

}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    grid: new Array(9).fill(0),
    winningCell: 3,
    player: 1
  });

  const onClickCell = (cellIndex) => {
    dispatch({ type: ACTIONS.PLAY, payload: { cellIndex } })
  }

  return (
    <div className='grid'>
      {state.grid.map((cell, i) => <Cell key={i} onClickCell={() => onClickCell(i)} cell={cell} />)}
    </div>
  );
}


const Cell = ({ onClickCell, cell }) => {
  let className = cell ? `cell player${cell}` : 'cell';
  return <button className={className} onClick={onClickCell} disabled={cell !== 0} >{cell}</button>
}

export default App;
