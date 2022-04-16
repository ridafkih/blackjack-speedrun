import { PlayerCard, Suit } from "../@types/card";

const cardMap: Record<number, string> = {
  1: "A",
  11: "J",
  12: "Q",
  13: "K",
};

/**
 * Generate a valid deck with 13 cards of each suit.
 * Values are from 1 - 13.
 * @returns A valid deck array.
 */
export const generateDeckCards = () => {
  const suits: Suit[] = ["CLUBS", "DIAMONDS", "DIAMONDS", "SPADES"];
  return suits.reduce((accumulator: PlayerCard[], suit) => {
    const cards = [...Array(13)].map((_, index) => index + 1);
    const fullCards = cards.map((value) => ({
      suit,
      ace: value === 1,
      value: value > 10 ? 10 : value,
      displayValue: cardMap[value] || value,
    }));

    return [...accumulator, ...fullCards];
  }, []);
};

/**
 * Creates a deck object with functions to manipulate it.
 * @returns The deck object.
 */
export const createDeck = () => {
  const cards = generateDeckCards();

  return {
    cards,
    pull: (amount: number = 1) => {
      if (cards.length - amount <= 0) cards.push(...generateDeckCards());
      const pulled = cards.splice(
        Math.floor(Math.random() * cards.length),
        amount
      );
      return pulled;
    },
  };
};

/**
 * Sums a deck of cards accomodating for Blackjack nuances.
 * @param cards The cards of the player.
 * @returns The sum of the cards.
 */
export const sumCards = (cards: PlayerCard[]) => {
  const hasAce = !!cards.find(({ ace }) => ace);
  const sum = cards.reduce((accumulator, { value }) => accumulator + value, 0);

  if (hasAce && sum < 12) return sum + 10;
  return sum;
};
