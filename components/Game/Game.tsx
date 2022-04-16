import React, { useEffect, useRef, useState } from "react";

import Player from "../Player/Player";
import Controls from "../Controls/Controls";

import styles from "./Game.module.css";
import { PlayerCard } from "../../@types/card";
import { createDeck, sumCards } from "../../utils/deck";

const Game: React.FC = () => {
  const deckRef = useRef<ReturnType<typeof createDeck>>();

  const [me, setMe] = useState<PlayerCard[]>([]);
  const [dealer, setDealer] = useState<PlayerCard[]>([]);
  const [flipped, setFlipped] = useState<boolean>(false);

  const hasBusted = (cards: PlayerCard[]) => sumCards(cards) > 21;
  const winner = (): "dealer" | "player" | "tie" | undefined => {
    if (!flipped) return;

    const hasPlayerBusted = hasBusted(me);
    const hasDealerBusted = hasBusted(dealer);

    if (hasPlayerBusted) return "dealer";
    if (hasDealerBusted) return "player";

    const dealerSum = sumCards(dealer);
    const playerSum = sumCards(me);

    if (dealerSum === playerSum) return "tie";
    else return dealerSum > playerSum ? "dealer" : "player";
  };

  const pullPlayerCard = () => {
    const { current: deck } = deckRef;

    if (winner() || hasBusted(me)) return;
    if (deck) setMe((previous) => [...previous, ...deck.pull()]);
  };

  const pullDealerCard = () => {
    const { current: deck } = deckRef;
    if (deck) setDealer((previous) => [...previous, ...deck.pull()]);
  };

  const playerStay = () => {
    const { current: deck } = deckRef;
    if (!deck || winner()) return;

    setFlipped(true);
    const dealerSum = sumCards(dealer);
    const isTie = dealerSum === sumCards(me);
    if (dealerSum >= 17 || isTie) return;
    pullDealerCard();
  };

  const playerHit = () => {
    if (flipped) return;
    const { current: deck } = deckRef;
    if (deck) pullPlayerCard();
  };

  useEffect(() => {
    const { current: deck } = deckRef;
    if (!deck || !flipped) return;

    if (winner()) return;
    if (sumCards(me) > sumCards(dealer)) pullDealerCard();
  }, [me, dealer, flipped, winner]);

  useEffect(() => {
    if (hasBusted(me)) setFlipped(true);
  }, [me]);

  useEffect(() => {
    deckRef.current = createDeck();
    const { current: deck } = deckRef;

    setDealer(deck.pull(2));
    setMe(deck.pull(2));
  }, []);

  return (
    <div className={styles.container}>
      <Player
        cards={dealer}
        flipped={flipped}
        busted={hasBusted(dealer)}
        winner={winner() === "dealer"}
        tie={winner() === "tie"}
        dealer
      />
      <Controls onDeal={playerHit} onStay={playerStay} />
      <Player
        cards={me}
        busted={hasBusted(me)}
        winner={winner() === "player"}
        tie={winner() === "tie"}
      />
    </div>
  );
};

export default Game;
