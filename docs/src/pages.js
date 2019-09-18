export default [
  {
    pathname: '/demos',
    title: 'Demos',
    children: [
      { pathname: '/demos/bare-bones', title: 'Bare Bones' },
      { pathname: '/demos/some-flesh', title: 'Some Flesh' },
      { pathname: '/demos/arrowheads', title: 'Arrowheads' },
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
