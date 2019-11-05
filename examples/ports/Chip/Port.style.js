import colours from './colours';

const iconSize = 8;

export default {
  port: ({ isInput, disabled }) => ({
    position: 'relative',
    left: (isInput ? -iconSize : iconSize) / 2,
    display: 'flex',
    flexDirection: isInput ? 'row' : 'row-reverse',
    alignItems: 'center',
    opacity: disabled ? 0.25 : 1,
    transition: 'opacity 0.5s',
  }),
  icon: ({ type }) => ({
    width: iconSize,
    height: iconSize,
    backgroundColor: colours[type],
    borderRadius: iconSize,
  }),
  label: ({ connected }) => ({
    padding: [[0, 4]],
    color: connected ? '#333' : '#999',
    transition: 'color 0.25s',
    fontSize: 10,
  }),
};
