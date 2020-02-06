export default {
  '@global': {
    ':not(pre) > code': {
      padding: [[2, 6]],
      backgroundColor: '#fdf6e3',
      fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
      borderRadius: 2,
    },
    '.prism-code > .token-line:not(:last-child)': {
      minHeight: '1rem',
    },
    blockquote: {
      backgroundColor: `rgba(255, 229, 100, 0.3)`,
      borderLeftColor: '#ffe564',
      borderLeftWidth: 9,
      borderLeftStyle: `solid`,
      padding: [[1, 45, 1, 26]],
      margin: [[20, 0, 30, 0]],
    },
    details: {
      backgroundColor: '#ffe564',
      padding: 10,
      paddingInlineStart: 24,
    },
    '[data-target]': {
      pointerEvents: 'auto',
      cursor: 'pointer',
    },
    // data-target is dropped on the root element, which is the only one we
    // care about - we don't want mouse events from children.
    // But svg elements get no pointer events (they have no geometry), so we
    // actually want to get mouse events from all children, and then we'll
    // use closest('[data-target]') to find the root.
    '[data-target]:not(g) > *': {
      pointerEvents: 'none',
    },
  },
};
