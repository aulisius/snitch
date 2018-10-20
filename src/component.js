import PropTypes from "prop-types";
import { Component } from "react";
import { actions, snitchState } from "./ducks";

export class Snitch extends Component {
  constructor(props) {
    super(props);
    this.key = Symbol();
    this.setVisibility = this.setVisibility.bind(this);
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

  setVisibility(_) {
    this.props.dispatch(
      actions.setVisibility(
        {
          key: this.key,
          snitch: _
        },
        {}
      )
    );
  }

  render() {
    let {
      visibilityById: { [this.key]: state = snitchState },
      render
    } = this.props;
    return render(
      {
        show: state.isVisible,
        open: _ => this.setVisibility(1),
        close: _ => this.setVisibility(0)
      },
      state.triggerAction
    );
  }
}

Snitch.propTypes = {
  closesOn: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  closesWhen: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
  opensOn: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  opensWhen: PropTypes.func,
  render: PropTypes.func.isRequired,
  visibilityById: PropTypes.object.isRequired
};

Snitch.defaultProps = {
  closesOn: [],
  closesWhen: _ => true,
  opensOn: [],
  opensWhen: _ => true
};
