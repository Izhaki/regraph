export default () => dispatch => {
  dispatch({ type: 'deleteSelected' });
  // Providing empty `metas` means connections and nodes won't remove the
  // selected flag from the (already deleted) items.
  // `all` will clear the `selected` array.
  dispatch({ type: 'deselect', metas: [], all: true });
};
