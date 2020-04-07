const moveSelectionTool = getEditPolicies => ({ getState, dispatch }) => {
  let selected = null;
  let policies;
  return action => {
    switch (action.type) {
      case 'mouseDown': {
        selected = getState().selected;

        if (selected.length) {
          policies = getEditPolicies(action.event.target, 'move');

          if (policies && policies.start) {
            selected.forEach(target => {
              action.event.source = target;
              policies.start.forEach(start => {
                start(action.event);
              });
            });
          }
        }

        break;
      }
      case 'mouseMove': {
        if (policies && policies.drag) {
          selected.forEach(target => {
            action.event.source = target;
            policies.drag.forEach(drag => {
              drag(action.event);
            });
          });
        }
        break;
      }

      case 'mouseUp': {
        if (policies && policies.end) {
          selected.forEach(target => {
            action.event.source = target;
            policies.end.forEach(end => {
              end(action.event);
            });
          });
        }
        policies = null;
        break;
      }

      default:
    }
  };
};

export default moveSelectionTool;
