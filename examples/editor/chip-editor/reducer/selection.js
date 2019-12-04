export const select = ({ selected }, { metas }) => {
  selected.push(...metas);
};

export const deselect = ({ selected }, { all }) => {
  if (all) {
    selected.length = 0;
  }
};
