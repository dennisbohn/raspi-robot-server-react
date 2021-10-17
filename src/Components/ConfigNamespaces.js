import { Component } from "react";
import "./ConfigNamespaces.css";

class ConfigNamespaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namespaces: [],
    };
    this.getNamespaces = this.getNamespaces.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.socket && this.props.socket) {
      this.getNamespaces();
    }
  }

  getNamespaces() {
    this.props.socket.emit("getNamespaces", (response) => {
      this.setState({
        namespaces: response.namespaces,
      });
    });
  }

  render() {
    return (
      <div className="ConfigNamespaces">
        <p>
          Bitte wählen Sie den Namespace aus, den Sie konfigurieren möchten.
        </p>
        <ul>
          {this.state.namespaces.map((namespace) => {
            return (
              <li key={namespace}>
                <span>{namespace}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ConfigNamespaces;
