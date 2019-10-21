import { Quadratic } from './Quadratic';
import { toSvg } from '../point';

export interface QuadraticElement {
  type: string;
  props: {
    d: string;
  };
}

export default (quad: Quadratic): QuadraticElement => ({
  type: 'path',
  props: {
    d: [
      `M ${toSvg(quad.src)}`,
      `Q ${toSvg(quad.c1)}`,
      `  ${toSvg(quad.dst)}`,
    ].join(' '),
  },
});
