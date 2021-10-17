import ConfigList from "./ConfigList";

class ConfigListNamespaces extends ConfigList {
  constructor(props) {
    super(props);
    // this.getNamespaces();
    console.log(this.props);
  }

  getNamespaces() {
    this.props.socket.emit("getNamespaces", (response) => {
      this.setState({
        namespaces: response.namespaces,
      });
    });
  }
}

export default ConfigListNamespaces;
