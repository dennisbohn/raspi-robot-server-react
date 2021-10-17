import { Component } from "react";

class ConfigList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="ConfigList">
        <h2>{this.title}</h2>
        {this.state.item && (
          <ul>
            {this.state.items.map((item) => {
              return <li key={item.key}>{item.name}</li>;
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default ConfigList;
