export default [
  {
    pathname: '/examples',
    title: 'Examples',
    children: [
      { pathname: '/examples/bare-bones', title: 'Bare Bones' },
      { pathname: '/examples/some-flesh', title: 'Some Flesh' },
      { pathname: '/examples/arrowheads', title: 'Arrowheads' },
    ],
  },
  {
    pathname: '/graph',
    title: 'Graph',
    children: [
      { pathname: '/graph/Graph', title: 'Graph' },
      { pathname: '/graph/withViewportSize', title: 'withViewportSize' },
      { pathname: '/graph/withLayout', title: 'withLayout' },
    ],
  },
];
