import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
import { actions } from "./ducks";

export function Snitch({ dispatch, render, ...props }) {
  let key = useMemo(() => Symbol(), []);

  useEffect(() => {
    dispatch(actions.listen({ ...props, key }));
    return () => dispatch(actions.unlisten(key));
  }, []);
  let {
    [key]: state = {
      triggerAction: {},
      isVisible: props.defaultOpen
    }
  } = props.visibilityById;

  let setVisibility = _ => dispatch(actions.setVisibility([key, _], {}));

  return render(
    {
      show: state.isVisible,
      open: () => setVisibility(1),
      close: () => setVisibility(0)
    },
    state.triggerAction
  );
}

Snitch.propTypes = {
  closesOn: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  closesWhen: PropTypes.func,
  defaultOpen: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  opensOn: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  opensWhen: PropTypes.func,
  render: PropTypes.func.isRequired,
  visibilityById: PropTypes.object.isRequired
};

Snitch.defaultProps = {
  closesOn: [],
  closesWhen: () => true,
  defaultOpen: false,
  opensOn: [],
  opensWhen: () => true
};
