import React from 'react';
import PropTypes from 'prop-types';

const mergeWithDefaults = (defaults, connection) => ({
  ...defaults,
  ...connection,
  src: { ...defaults.src, ...connection.src },
  dst: { ...defaults.dst, ...connection.dst },
});

const createConnection = defaults => connection => {
  const { type, ...props } = defaults
    ? mergeWithDefaults(defaults, connection)
    : connection;
  props.key = connection.id;
  return React.createElement(type, props);
};

const Connections = ({ connections, connection: defaults }) => (
  <g className="regraph-connections">
    {connections.map(createConnection(defaults))}
  </g>
);

Connections.propTypes = {
  connection: PropTypes.shape({
    type: PropTypes.elementType,
  }),
  connections: PropTypes.array,
};

export default Connections;
