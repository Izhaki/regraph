const multiTool = (...perAppliedTools) => getEditPolicies => store => {
  const tools = perAppliedTools.map(tool => tool(getEditPolicies)(store));

  return action => {
    tools.forEach(tool => tool(action));
  };
};

export default multiTool;
