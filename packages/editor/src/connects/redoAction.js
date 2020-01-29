import { connect } from 'react-redux';
import { redo } from '../actions';

const isLast = (list, index) => index === list.length - 1;

const mapStateToProps = ({ commands }) => ({
  canRedo: !isLast(commands.stack, commands.head),
});

const mapDispatchToProps = {
  redo,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
