import colours from './colours';

const borderRadius = 4;

export default {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
    borderRadius,
  },
  selected: {
    boxShadow: '0 0 4px #ff9800',
  },
  header: ({ type }) => ({
    padding: 5,
    backgroundColor: colours[type],
    color: '#f9f7ea',
    textAlign: 'center',
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
  }),
  body: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: [[4, 0]],
    backgroundColor: '#f7f1d5 ',
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  outputs: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
};
