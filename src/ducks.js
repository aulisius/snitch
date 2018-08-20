let actionTypes = {
  OPEN: "[Snitch] Start",
  CLOSE: "[Snitch] Stop",
  TOGGLE: "[Snitch] Toggle"
};

export let snitchState = { isVisible: false, triggerAction: {} };

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
  setVisibility(actionProps, { type, ...triggerAction } = {}) {
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
  let state = store.getState()[reducerKey];
  state.listeningTo
    .filter(
      ({ actionType, snitch, updateWhen }) =>
        actionType === action.type && (updateWhen(action) || snitch === 0)
    )
    .forEach(listenAction =>
      store.dispatch(actions.setVisibility(listenAction, action))
    );
  return result;
};

export let snitchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN: {
      let { opensOn = [], closesOn = [], key, updateWhen } = action;
      return {
        ...state,
        listeningTo: [
          ...state.listeningTo,
          ...[].concat(opensOn).map(actionType => ({
            snitch: 1,
            actionType,
            key,
            updateWhen
          })),
          ...[].concat(closesOn).map(actionType => ({
            snitch: 0,
            actionType,
            key,
            updateWhen
          }))
        ],
        visibilityById: {
          ...state.visibilityById,
          [key]: snitchState
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
