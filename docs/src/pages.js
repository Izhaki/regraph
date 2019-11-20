export default [
  {
    pathname: '/examples',
    title: 'Examples',
    children: [
      { pathname: '/examples/graph-base', title: 'GraphBase' },
      { pathname: '/examples/basic-graph', title: 'Basic Graph' },
      { pathname: '/examples/html-nodes', title: 'HTML Nodes' },
      { pathname: '/examples/auto-box', title: 'Auto Box' },
      {
        pathname: '/examples/connections',
        title: 'Connections',
        children: [
          { pathname: '/examples/connections/arrowheads', title: 'Arrowheads' },
          { pathname: '/examples/connections/anchors', title: 'Anchors' },
          { pathname: '/examples/connections/looms', title: 'Looms' },
          { pathname: '/examples/connections/ports', title: 'Ports' },
        ],
      },
      {
        pathname: '/examples/interactive',
        title: 'Interactive',
        children: [
          { pathname: '/examples/interactive/drag-circles', title: 'dragging' },
        ],
      },
    ],
  },
];
