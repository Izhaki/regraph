export default getEditPolicies => ({ getState }) => {
  let source = null;
  return next => action => {
    switch (action.type) {
      case 'mouseDown': {
        const { target } = action.event;
        const { connection } = getEditPolicies(target);
        if (connection) {
          source = target;
          return next(connection.start(target, action.event, getState()));
        }
        break;
      }

      case 'mouseMove': {
        if (source) {
          const { target } = action.event;
          const { connection } = getEditPolicies(source);
          return next(
            connection.drag(source, target, action.event, getState())
          );
        }
        break;
      }

      case 'mouseUp': {
        if (source) {
          const { target } = action.event;
          const { connection } = getEditPolicies(source);
          return next(connection.end(source, target, action.event, getState()));
        }
        break;
      }
      default:
    }

    return next(action);
  };
};
