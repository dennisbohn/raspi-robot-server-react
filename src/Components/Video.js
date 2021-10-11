import React, { Component } from "react";
import "./Video.css";
import byteSize from "byte-size";

class Video extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.statsCollector = {
      bitrate: 0,
      frames: 0,
    };
    this.state = {
      loading: true,
      frames: 0,
      bitrate: 0,
      showStats: false,
    };
  }

  componentDidMount() {
    this.generatePlayer();
    this.getBitrate();

    // Attach player to dom
    this.ref.current.appendChild(this.player.canvas);
  }

  componentDidUpdate(prevProps, prevState) {
    // Add event listener when socket changed
    if (!prevProps.socket && this.props.socket) {
      // Set event listener
      this.props.socket.on("chunk", this.chunk.bind(this));
      this.props.socket.on("preloaded", (preloaded) => {
        if (preloaded) this.setState({ loading: false });
      });
    }
  }

  getBitrate() {
    setInterval(() => {
      const bitrate = byteSize(this.statsCollector.bitrate);
      this.setState({
        bitrate: bitrate.toString(),
        frames: this.statsCollector.frames,
      });
      this.statsCollector.bitrate = 0;
      this.statsCollector.frames = 0;
    }, 1000);
  }

  generatePlayer() {
    this.player = new window.Player({
      size: {
        width: 1280,
        height: 720,
      },
    });
  }

  chunk(chunk) {
    const chunkData = new Uint8Array(chunk);
    this.statsCollector.bitrate += chunk.byteLength;
    this.statsCollector.frames++;
    this.player.decode(chunkData);
  }

  toggleStats() {
    this.setState({
      showStats: !this.state.showStats,
    });
  }

  render() {
    return (
      <>
        <div className="Video" ref={this.ref}>
          {this.state.showStats && (
            <ul className="stats">
              <li>Framerate: {this.state.frames} fps/s</li>
              <li>Bitrate: {this.state.bitrate}/s</li>
            </ul>
          )}
          {this.state.loading && (
            <div className="loading">
              <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
        </div>
        <div>
          <button onClick={this.toggleStats.bind(this)}>
            Statistik {this.state.showStats ? "ausblenden" : "einblenden"}
          </button>
        </div>
      </>
    );
  }
}

export default Video;
