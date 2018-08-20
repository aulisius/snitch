import PropTypes from "prop-types";
import { Component } from "react";
import { actions, snitchState } from "./ducks";

export class Snitch extends Component {
  constructor(props) {
    super(props);
    this.key = Symbol();
  }

  componentDidMount() {
    this.props.dispatch(
      actions.listen({
        ...this.props,
        key: this.key
      })
    );
  }

  componentWillUnmount() {
    this.props.dispatch(
      actions.unlisten({
        ...this.props,
        key: this.key
      })
    );
  }

  render() {
    let {
      visibilityById: {
        [this.key]: { isVisible, triggerAction } = snitchState
      },
      render,
      onClose,
      onOpen
    } = this.props;
    return render(
      {
        show: isVisible,
        openView: () => {
          this.props.dispatch(
            actions.setVisibility({
              key: this.key,
              snitch: 1
            })
          );
          onOpen(triggerAction);
        },
        closeView: () => {
          this.props.dispatch(
            actions.setVisibility({
              key: this.key,
              snitch: 0
            })
          );
          onClose(triggerAction);
        }
      },
      triggerAction
    );
  }
}

Snitch.propTypes = {
  closesOn: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  dispatch: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  opensOn: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  render: PropTypes.func.isRequired,
  visibilityById: PropTypes.object.isRequired
};

Snitch.defaultProps = {
  onClose: _ => _,
  onOpen: _ => _,
  updateWhen: _ => true
};
