import React, { useCallback } from "react";
import { PlayerCard } from "../../@types/card";
import { sumCards } from "../../utils/deck";
import Card from "../Card/Card";

import styles from "./Player.module.css";

interface PlayerProps {
  cards: PlayerCard[];
  dealer?: boolean;
  flipped?: boolean;
  busted?: boolean;
  winner?: boolean;
  tie?: boolean;
}

const Player: React.FC<PlayerProps> = ({ cards, ...props }) => {
  const getSum = useCallback(sumCards, [cards]);

  const classMap = {
    dealer: styles.dealer,
    flipped: styles.flipped,
    busted: styles.busted,
    winner: styles.winner,
    tie: styles.tie,
  };

  const containerClassName = Object.entries(classMap).reduce(
    (accumulator, [key, value]) => {
      if (!props[key as keyof typeof props]) return accumulator;
      return (accumulator += ` ${value}`);
    },
    styles.container
  );

  return (
    <div className={containerClassName}>
      <div className={styles.hand}>
        {cards.map(({ suit, displayValue }, index) => {
          return <Card key={index} suit={suit} displayValue={displayValue} />;
        })}
      </div>
      <div className={styles.value}>{getSum(cards)}</div>
    </div>
  );
};

export default Player;
