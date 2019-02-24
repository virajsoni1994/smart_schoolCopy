import React, { Component } from "react";

class GridActions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <span>
        {(this.props.data.IsActive && <span className="green" />) || (
          <span className="red" />
        )}
      </span>
    );
  }
}

export default GridActions;
