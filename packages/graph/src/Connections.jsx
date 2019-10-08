import React from 'react';
import PropTypes from 'prop-types';
import getConnectionId from './getConnectionId';

const Connections = ({ connections, renderConnection, graphProps }) => (
  <>
    {connections.map(connection => {
      const id = getConnectionId(connection);
      return renderConnection({ ...connection, id }, graphProps);
    })}
  </>
);

Connections.propTypes = {
  connections: PropTypes.array,
  graphProps: PropTypes.object,
  renderConnection: PropTypes.func.isRequired,
};

export default Connections;
