import { toSvg } from '@regraph/geo/point';
import { Quadratic } from './Quadratic';

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
