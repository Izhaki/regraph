import { connect } from 'react-redux';
import { undo } from '../actions';

const mapStateToProps = ({ commands }) => ({
  canUndo: commands.head >= 0,
});

const mapDispatchToProps = {
  undo,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
