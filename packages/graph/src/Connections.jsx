import React from 'react';
import PropTypes from 'prop-types';

const Connections = ({ connections, renderConnection, graphProps }) => (
  <>{connections.map(connection => renderConnection(connection, graphProps))}</>
);

Connections.propTypes = {
  connections: PropTypes.array,
  graphProps: PropTypes.object,
  renderConnection: PropTypes.func.isRequired,
};

export default Connections;
