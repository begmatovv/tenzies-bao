import { useEffect, useState } from "react";
import Dice from "./Dice";
import "./App.css";
import { nanoid } from "nanoid";
function App() {
  const [dices, setDices] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [start, setStart] = useState(false);

  useEffect(() => {
    let value = dices[0].value;
    let isHeld = dices.every((dice) => dice.isHeld);
    let sameValue = dices.every((dice) => dice.value === value);
    if (sameValue && isHeld) {
      setTenzies(true);
    } else {
      setTenzies(false);
    }
  }, [dices]);

  function allNewDice() {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push({
        id: nanoid(),
        value: Math.floor(Math.random() * 9) + 1,
        isHeld: false,
      });
    }
    return newArray;
  }
  function rollDice() {
    if (tenzies) {
      setStart(false);
      setDices(allNewDice());
      return;
    }
    setDices((dices) =>
      dices.map((dice) => {
        return dice.isHeld === false
          ? { ...dice, value: Math.floor(Math.random() * 9) + 1 }
          : dice;
      })
    );
  }

  function holdDice(id) {
    setStart(true);
    if (tenzies) {
      return;
    }

    setDices((dices) =>
      dices.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
  }

  function handleClick() {
    if (tenzies) {
      setStart(false);
      setDices(allNewDice());
      return;
    }
    setDices((dices) =>
      dices.map((dice) => {
        return dice.isHeld === false
          ? { ...dice, value: Math.floor(Math.random() * 9) + 1 }
          : dice;
      })
    );
  }
  const diceElements = dices.map((dice) => {
    return (
      <Dice
        key={dice.id}
        value={dice.value}
        isHeld={dice.isHeld}
        id={dice.id}
        holdDice={() => holdDice(dice.id)}
      />
    );
  });

  return (
    <div>
      <div className="card">
        <div className="card-main">
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <ul>{diceElements}</ul>

          <button onClick={rollDice} className="roll-btn">
            {tenzies ? "New Game" : "Roll"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
