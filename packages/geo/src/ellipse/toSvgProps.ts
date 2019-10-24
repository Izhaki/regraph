import Ellipse from './Ellipse';

export interface SvgProps {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

export default (ellipse: Ellipse): SvgProps => ({
  cx: ellipse.center.x,
  cy: ellipse.center.y,
  rx: ellipse.rx,
  ry: ellipse.ry,
});
