export default {
  '@global': {
    ':not(pre) > code': {
      padding: [[2, 0]],
      backgroundColor: '#fdf6e3',
      fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
      borderRadius: 2,
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
    '[data-regraph-graph]': {
      margin: [[0, 'auto']],
      borderRadius: 6,
      backgroundColor: `#fdf6e3`,
    },
  },
};
