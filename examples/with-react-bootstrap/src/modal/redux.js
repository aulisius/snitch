export let actionTypes = {
  OPEN_MODAL: "[Modal] Open"
};

export let actions = {
  showModal() {
    return {
      type: actionTypes.OPEN_MODAL
    };
  }
};
