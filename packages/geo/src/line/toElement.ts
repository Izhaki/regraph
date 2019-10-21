import { Line } from './Line';
import toSvgProps, { SvgProps } from './toSvgProps';

export interface LineElement {
  type: string;
  props: SvgProps;
}

export default (line: Line): LineElement => ({
  type: 'line',
  props: toSvgProps(line),
});
