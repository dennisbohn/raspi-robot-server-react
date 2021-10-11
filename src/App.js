import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Video from "./Components/Video";
import "./App.css";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3001/uturm");
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  return (
    <div className="App">
      <Video socket={socket} />
    </div>
  );
}

export default App;
