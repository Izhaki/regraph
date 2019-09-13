export interface Point {
  x: number;
  y: number;
}

// eslint-disable-next-line import/prefer-default-export
export const toSvg = ({ x, y }): string => `${x},${y}`;
