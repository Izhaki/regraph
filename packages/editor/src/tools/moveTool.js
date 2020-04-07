const moveTool = getEditPolicies => () => {
  let source;
  let policies;
  return action => {
    switch (action.type) {
      case 'mouseDown': {
        const { target } = action.event;
        source = target;

        policies = getEditPolicies(target, 'move');

        if (policies && policies.start) {
          action.event.source = source;
          policies.start.forEach(start => {
            start(action.event);
          });
        }
        break;
      }

      case 'mouseMove': {
        if (policies && policies.drag) {
          action.event.source = source;
          policies.drag.forEach(drag => {
            drag(action.event);
          });
        }
        break;
      }

      case 'mouseUp': {
        if (policies && policies.end) {
          action.event.source = source;
          policies.end.forEach(end => {
            end(action.event);
          });
        }
        policies = null;
        break;
      }

      default:
    }
  };
};

export default moveTool;
