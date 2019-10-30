import React from 'react';
import PropTypes from 'prop-types';

const createConnection = connection => {
  const { type, ...props } = connection;
  props.key = connection.id;
  return React.createElement(type, props);
};

const Connections = ({ connections }) => (
  <g className="regraph-connections">{connections.map(createConnection)}</g>
);

Connections.propTypes = {
  connection: PropTypes.shape({
    type: PropTypes.elementType,
  }),
  connections: PropTypes.array,
};

export default Connections;
