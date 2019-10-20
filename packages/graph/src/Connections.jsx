import React from 'react';
import PropTypes from 'prop-types';

const mergeConnection = (element, connection) =>
  React.cloneElement(element, {
    ...connection,
    src: { ...element.props.src, ...connection.src },
    dst: { ...element.props.dst, ...connection.dst },
  });

const Connections = ({ connections, connection: element }) => (
  <>
    {connections.map(connection => (
      <React.Fragment key={connection.id}>
        {mergeConnection(element, connection)}
      </React.Fragment>
    ))}
  </>
);

Connections.propTypes = {
  connection: PropTypes.element,
  connections: PropTypes.array,
};

export default Connections;
