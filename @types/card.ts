export type Suit = "SPADES" | "CLUBS" | "HEARTS" | "DIAMONDS";

export interface PlayerCard {
  suit: Suit;
  value: number;
  ace: boolean;
  displayValue: string | number;
}
