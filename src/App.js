import { useEffect, useReducer } from 'react';
import './App.css';

const ACTIONS = {
  INIT: 'init',
  PLAY: 'play',
  WON: 'won'
}

const reducer = (state, actions) => {
  switch (actions.type) {
    case ACTIONS.INIT:
      const random = Math.floor(Math.random() * 8)
      return { grid: new Array(9).fill(0), winningCell: random, player: 1, won: false };
    case ACTIONS.PLAY:
      let updatedGrid = [...state.grid];
      updatedGrid[actions.payload.cellIndex] = state.player;
      const updatedPlayer = state.player === 1 ? 2 : 1;
      return { ...state, player: updatedPlayer, grid: updatedGrid }
    case ACTIONS.WON:
      let finalGrid = [...state.grid];
      finalGrid[actions.payload.cellIndex] = 3;
      return { ...state, grid: finalGrid, won: true }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    grid: new Array(9).fill(0),
    winningCell: 0,
    player: 1
  });

  useEffect(() => {
    initGame()
  }, [])

  const initGame = () => {
    dispatch({ type: ACTIONS.INIT })
  }

  const onClickCell = (cellIndex) => {
    dispatch({
      type: cellIndex === state.winningCell ? ACTIONS.WON : ACTIONS.PLAY,
      payload: { cellIndex }
    })
  }

  return (
    <>
      <button onClick={initGame}>Reset</button>
      <div className='grid'>
        {state.grid.map((cell, i) => <Cell key={i} onClickCell={() => onClickCell(i)} cell={cell} disabled={cell !== 0 || state.won} />)}
      </div>
      {state.won && <h3>Player {state.player} won the game!</h3>}
    </>

  );
}


const Cell = ({ onClickCell, cell, disabled }) => {
  let className = cell ? `cell player${cell}` : 'cell';
  let text = cell ? `Player ${cell}` : 'Click me!';
  text = cell < 3 ? text : `WIN!!`
  return <button className={className} onClick={onClickCell} disabled={disabled} >{text}</button>
}

export default App;
