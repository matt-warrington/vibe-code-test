import React, { useEffect, useState, useRef } from 'react';
import GameBoard from './GameBoard';
import Chat from './Chat';
import './Chat.css';
import './App.css';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(squares);

  function handleClick(i) {
    if (winner || squares[i]) return;
    const next = squares.slice();
    next[i] = xIsNext ? 'X' : 'O';
    setSquares(next);
    setXIsNext(!xIsNext);
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => handleClick(i)}>
        {squares[i]}
      </button>
    );
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  function addGame() {
    const id = nextId.current++;
    setGames([
      ...games,
      { id, squares: Array(9).fill(null), xIsNext: true },
    ]);
    setActiveId(id);
  }

  function handlePlay(nextSquares) {
    setGames(
      games.map((g) =>
        g.id === activeId
          ? { ...g, squares: nextSquares, xIsNext: !g.xIsNext }
          : g
      )
    );
  }

  const activeGame = games.find((g) => g.id === activeId);

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      <p>{message}</p>
      <div className="tabs">
        {games.map((game, index) => (
          <button
            key={game.id}
            className={game.id === activeId ? 'active-tab' : ''}
            onClick={() => setActiveId(game.id)}
          >
            Game {index + 1}
          </button>
        ))}
        <button onClick={addGame}>New Game</button>
      </div>
      {activeGame && (
        <div className="board">
          <GameBoard
            squares={activeGame.squares}
            xIsNext={activeGame.xIsNext}
            onPlay={handlePlay}
          />
        </div>
      )}
    </div>
  );
}

export default App;
