import { connect } from 'react-redux';
import { setCurrentTool } from '../actions';

const mapDispatchToProps = { setCurrentTool };

const mapStateToProps = ({ tools }) => ({
  currentTool: tools.current,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
