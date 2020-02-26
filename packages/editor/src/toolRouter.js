const toolRouter = (preAppliedTools, getEditPolicies) => store => {
  const tools = preAppliedTools.map(tool => tool(getEditPolicies)(store));
  const { getState } = store;
  return next => action => {
    const { current } = getState().tools;
    tools[current](action);
    return next(action);
  };
};

export default toolRouter;
