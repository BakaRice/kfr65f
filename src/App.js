import { useState } from "react";
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currPlay = currentMove % 2 === 0 ? "X" : "O";
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    // TODO
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div>
      <div className="game">
        <div className="game-board">
          <Board
            currPlayer={currPlay}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
}

function Board({ currPlayer, squares, onPlay }) {
  //value 存储值，而 setValue 是可用于更改值的函数。
  // 传递给 useState 的 null 用作这个 state 变量的初始值，
  // 因此此处 value 的值开始时等于 null。
  // const [squares, setSquares] = useState(Array(9).fill(null));
  // const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(squares);

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + currPlayer;
  }
  function handleClick(idx) {
    if (squares[idx] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[idx] = currPlayer;
    onPlay(nextSquares);
    // setXIsNext(!xIsNext);
    // setSquares(nextSquares);
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {/* ()=>{} ,()=> handleClick(0) 是一个箭头函数 */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  // 计算胜者
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// 如果你有额外的时间或想练习新的 React 技能，这里有一些你可以改进井字棋游戏的想法，按难度递增的顺序列出：

// 仅针对当前着手，显示“You are at move #…”而不是按钮。
// 重写 Board 以使用两个循环来制作方块而不是对它们进行硬编码。
// 添加一个切换按钮，使可以按升序或降序对落子的步数进行排序。
// 当有人获胜时，突出显示致使获胜的三个方块（当没有人获胜时，显示一条关于结果为平局的消息）。
// 在“落子”的历史列表中以 (row, col) 格式显示每步的位置。
// 在本教程中，你已经接触到了 React 概念，包括元素、组件、props 和 state。现在你已经了解了这些概念在构建游戏时是如何工作的，请查看 React 哲学 以了解这些 React 概念在构建应用的 UI 时是如何工作的。
