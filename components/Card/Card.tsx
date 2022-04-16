import React from "react";

import styles from "./Card.module.css";

import { Suit } from "../../@types/card";

interface CardProps {
  suit: Suit;
  displayValue: string | number;
}

const Card: React.FC<CardProps> = ({ suit, displayValue }) => {
  const suitMap: Record<Suit, string> = {
    CLUBS: "♣",
    DIAMONDS: "♦",
    HEARTS: "♥",
    SPADES: "♠",
  };

  const containerClass = [styles.container, styles[suit]].join(" ");

  return (
    <div className={containerClass}>
      <div className={styles.value}>{displayValue}</div>
      <div className={styles.suit}>{suitMap[suit]}</div>
      <div className={styles.value}>{displayValue}</div>
    </div>
  );
};

export default Card;
