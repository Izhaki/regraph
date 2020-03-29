import { isRect } from '@regraph/geo/rect';

export const { keys, values, entries } = Object;

// Core
const nullBox = { x: 0, y: 0, width: 0, height: 0 };
export const ensureRect = box => (isRect(box) ? box : { ...nullBox, ...box });

export const translate = (x, y) => `translate(${x} ${y})`;
