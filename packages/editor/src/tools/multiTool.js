export default (...perAppliedTools) => {
  const multiTool = getEditPolicies => store => {
    const tools = perAppliedTools.map(tool => tool(getEditPolicies)(store));

    return action => {
      tools.forEach(tool => tool(action));
    };
  };
  return multiTool;
};
