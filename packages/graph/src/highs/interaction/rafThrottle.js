import rafSchedule from 'raf-schd';

export default ({ onMouseMove: inMouseMove, ...passThroughs }) => {
  const scheduleMouseMove = rafSchedule(inMouseMove);

  const onMouseMove = event => {
    event.persist();
    scheduleMouseMove(event);
  };

  return {
    onMouseMove,
    ...passThroughs,
  };
};
