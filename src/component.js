import PropTypes from "prop-types";
import { Component } from "react";
import { actions, snitchState } from "./ducks";

export class Snitch extends Component {
  constructor(props) {
    super(props);
    this.key = Symbol(this.props.id);
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
      children = render,
      onHide,
      onOpen
    } = this.props;
    return children(
      {
        show: isVisible,
        onOpen: () => {
          this.props.dispatch(
            actions.setModalVisibility({
              key: this.key,
              snitch: 1
            })
          );
          onOpen(triggerAction);
        },
        onHide: () => {
          this.props.dispatch(
            actions.setModalVisibility({
              key: this.key,
              snitch: 0
            })
          );
          onHide(triggerAction);
        }
      },
      triggerAction
    );
  }
}

Snitch.propTypes = {
  children: PropTypes.func,
  closesOn: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  id: PropTypes.string,
  onHide: PropTypes.func,
  onOpen: PropTypes.func,
  opensOn: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  render: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
  updateWhen: PropTypes.func,
  visibilityById: PropTypes.object
};

Snitch.defaultProps = {
  id: "snitch",
  onHide: _ => _,
  onOpen: _ => _
};
