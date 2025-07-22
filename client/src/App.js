import React, { useEffect, useState, useRef } from 'react';
import GameBoard from './GameBoard';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [games, setGames] = useState([
    { id: 0, squares: Array(9).fill(null), xIsNext: true },
  ]);
  const [activeId, setActiveId] = useState(0);
  const nextId = useRef(1);

  useEffect(() => {
    fetch('/api/message')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Error fetching message'));
  }, []);

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
    <div>
      <h1>React + Node</h1>
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
        <GameBoard
          squares={activeGame.squares}
          xIsNext={activeGame.xIsNext}
          onPlay={handlePlay}
        />
      )}
    </div>
  );
}

export default App;
