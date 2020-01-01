import { connect } from 'react-redux';
import { deleteSelected } from '../actions';

const mapStateToProps = ({ selected }) => ({
  selected,
  selectionEmpty: selected.length === 0,
});

const mapDispatchToProps = {
  deleteSelected,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
