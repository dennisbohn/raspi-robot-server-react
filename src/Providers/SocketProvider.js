import React, { useContext } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();
const socket = io("http://localhost:3001/uturm");

export function useSocket() {
  return useContext(SocketContext);
}

export default function SocketProvider({ children }) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
