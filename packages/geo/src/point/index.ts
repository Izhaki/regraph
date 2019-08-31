export interface IPoint {
  x: number;
  y: number;
}

export const toSvg = ({ x, y }) => `${x},${y}`;
