import { useReducer } from 'react';
import './App.css';

const ACTIONS = {
  INIT: 'init',
  PLAY: 'play',
  UNDO: 'undo',
  WON: 'won'
}

const initState = { grid: new Array(9).fill(0), winningCell: null, player: 1, won: false };


const reducer = (state, actions, memo) => {
  memo.push(state);
  switch (actions.type) {
    case ACTIONS.INIT:
      const winningCell = Math.floor(Math.random() * 8)
      return { ...initState, winningCell };
    case ACTIONS.PLAY:
      let updatedGrid = [...state.grid];
      updatedGrid[actions.payload.cellIndex] = state.player;
      const updatedPlayer = state.player === 1 ? 2 : 1;
      return { ...state, player: updatedPlayer, grid: updatedGrid }
    case ACTIONS.UNDO:
      memo.pop()
      const prevState = memo.pop();
      return { ...prevState }
    case ACTIONS.WON:
      let finalGrid = [...state.grid];
      finalGrid[actions.payload.cellIndex] = 3;
      return { ...state, grid: finalGrid, won: true }
    default:
      return state
  }
}

const withMemo = (reducer) => {
  const memo = [];

  return (state, actions) => reducer(state, actions, memo)
}

const initReducerWithMemo = withMemo(reducer);


function App() {
  const [state, dispatch] = useReducer(
    initReducerWithMemo,
    initState,
    (state) => {
      const random = Math.floor(Math.random() * 8)
      return { ...state, winningCell: random }
    }
  );

  const initGame = () => {
    dispatch({ type: ACTIONS.INIT })
  }

  const undo = () => {
    dispatch({ type: ACTIONS.UNDO })
  }

  const onClickCell = (cellIndex) => {
    dispatch({
      type: cellIndex === state.winningCell ? ACTIONS.WON : ACTIONS.PLAY,
      payload: { cellIndex }
    })
  }

  console.log(state)

  return (
    <>
      <button onClick={initGame}>Reset</button>
      <button onClick={undo}>Undo</button>

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
