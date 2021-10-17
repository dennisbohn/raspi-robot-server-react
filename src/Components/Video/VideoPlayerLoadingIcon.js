import React from "react";
import "./VideoPlayerLoadingIcon.css";
import { useSocket } from "../../Providers/SocketProvider";

export default function VideoPlayerLoadingIcon() {
  const socket = useSocket();
  const ref = React.useRef(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    socket.on("preloading", (preloading) => {
      if (preloading === "done") setLoading(false);
    });
  }, [socket]);

  return (
    <>
      {loading && (
        <div className="VideoPlayerLoading" ref={ref}>
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
    </>
  );
}
