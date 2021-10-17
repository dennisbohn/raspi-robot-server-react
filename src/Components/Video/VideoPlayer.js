import React from "react";
import "./VideoPlayer.css";
import { useSocket } from "../../Providers/SocketProvider";
import VideoPlayerLoadingIcon from "./VideoPlayerLoadingIcon";

export default function VideoPlayer() {
  const socket = useSocket();
  const ref = React.useRef(null);

  React.useEffect(() => {
    const player = new window.Player({
      size: {
        width: 960,
        height: 720,
      },
    });
    ref.current.appendChild(player.canvas);
    socket.on("chunk", (chunk) => {
      player.decode(new Uint8Array(chunk));
    });
  }, [socket]);

  return (
    <div className="VideoPlayer" ref={ref}>
      <VideoPlayerLoadingIcon />
    </div>
  );
}
