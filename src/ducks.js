let actionTypes = {
  OPEN: "[Snitch] Start",
  CLOSE: "[Snitch] Stop",
  TOGGLE: "[Snitch] Toggle"
};

let initialState = {
  listeningTo: [],
  visibilityById: {}
};

export let actions = {
  listen(actionProps) {
    return {
      ...actionProps,
      type: actionTypes.OPEN
    };
  },
  unlisten(actionProps) {
    return {
      ...actionProps,
      type: actionTypes.CLOSE
    };
  },
  setVisibility(actionProps, triggerAction) {
    return {
      ...actionProps,
      triggerAction,
      type: actionTypes.TOGGLE
    };
  }
};

export let snitchMiddleware = reducerKey => store => next => action => {
  let result = next(action);
  if (action.type.startsWith("[Snitch]")) {
    return result;
  }
  store
    .getState()
    [reducerKey].listeningTo.filter(
      ({ actionType, updateWhen }) =>
        actionType === action.type && updateWhen(action)
    )
    .forEach(listenAction =>
      store.dispatch(actions.setVisibility(listenAction, action))
    );
  return result;
};

export let snitchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN: {
      let {
        opensOn,
        closesOn,
        key,
        opensWhen,
        closesWhen,
        defaultOpen
      } = action;
      return {
        ...state,
        listeningTo: [
          ...state.listeningTo,
          ...[].concat(opensOn).map(actionType => ({
            snitch: 1,
            actionType,
            key,
            updateWhen: opensWhen
          })),
          ...[].concat(closesOn).map(actionType => ({
            snitch: 0,
            actionType,
            key,
            updateWhen: closesWhen
          }))
        ],
        visibilityById: {
          ...state.visibilityById,
          [key]: { triggerAction: {}, isVisible: defaultOpen }
        }
      };
    }

    case actionTypes.CLOSE: {
      return {
        ...state,
        listeningTo: state.listeningTo.filter(
          listenAction => listenAction.key !== action.key
        ),
        visibilityById: {
          ...state.visibilityById,
          [action.key]: undefined
        }
      };
    }

    case actionTypes.TOGGLE: {
      let { snitch, key, triggerAction } = action;
      return {
        ...state,
        visibilityById: {
          ...state.visibilityById,
          [key]: { isVisible: snitch === 1, triggerAction }
        }
      };
    }

    default:
      return state;
  }
};
