import React from "react";
import { nanoid } from "nanoid";
export default function Dice(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#fff",
  };
  return (
    <div className="dice" style={styles} onClick={props.holdDice}>
      <h2 key={nanoid} className="die-num">
        {props.value}
      </h2>
    </div>
  );
}
