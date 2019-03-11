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
  listen: _ => ({ ..._, type: actionTypes.OPEN }),
  unlisten: key => ({ key, type: actionTypes.CLOSE }),
  setVisibility: (props, trigger) => ({
    props,
    trigger,
    type: actionTypes.TOGGLE
  })
};

export let snitchMiddleware = reducerKey => store => next => action => {
  let result = next(action);
  if (action.type.startsWith("[Snitch]")) {
    return result;
  }
  store
    .getState()
    [reducerKey].listeningTo.filter(
      ([, , type, updateWhen]) => type === action.type && updateWhen(action)
    )
    .forEach(_ => store.dispatch(actions.setVisibility(_, action)));
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
          ...[].concat(opensOn).map(_ => [key, 1, _, opensWhen]),
          ...[].concat(closesOn).map(_ => [key, 0, _, closesWhen])
        ],
        visibilityById: {
          ...state.visibilityById,
          [key]: { trigger: {}, isVisible: defaultOpen }
        }
      };
    }

    case actionTypes.CLOSE: {
      return {
        ...state,
        listeningTo: state.listeningTo.filter(([key]) => key !== action.key),
        visibilityById: {
          ...state.visibilityById,
          [action.key]: undefined
        }
      };
    }

    case actionTypes.TOGGLE: {
      let {
        props: [key, snitch],
        trigger
      } = action;
      return {
        ...state,
        visibilityById: {
          ...state.visibilityById,
          [key]: { isVisible: snitch === 1, trigger }
        }
      };
    }

    default:
      return state;
  }
};
