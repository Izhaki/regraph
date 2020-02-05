import { connect } from 'react-redux';
import { newNode } from '../actions';

const mapDispatchToProps = {
  newNode,
};

export default connect(
  null,
  mapDispatchToProps
);
