import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Button from "./Components/Button";
import "./App.css";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`https://${window.location.hostname}:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
      <Button />
    </div>
  );
}

export default App;
