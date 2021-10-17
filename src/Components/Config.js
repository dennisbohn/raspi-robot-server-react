import React, { Component } from "react";
import "./Config.css";
import ConfigListNamespaces from "./ConfigListNamespaces";

class Config extends Component {
  render() {
    return (
      <div className="Config">
        <ConfigListNamespaces
          title="Namespace"
          socket={this.props.socket}
        ></ConfigListNamespaces>
      </div>
    );
  }
}

export default Config;
