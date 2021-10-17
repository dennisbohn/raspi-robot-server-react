import React, { useEffect } from "react";
import { useSocket } from "./SocketProvider";

const ConfigurationContext = React.createContext();
const SetConfigurationContext = React.createContext();
const SaveConfigurationContext = React.createContext();

export function useConfiguration() {
  return React.useContext(ConfigurationContext);
}

export function useSetConfiguration() {
  return React.useContext(SetConfigurationContext);
}

export function useSaveConfiguration() {
  return React.useContext(SaveConfigurationContext);
}

export default function ConfigurationProvider({ children }) {
  const [configuration, setConfiguration] = React.useState(false);
  const socket = useSocket();

  useEffect(() => {
    socket.emit("getConfiguration", (serverConfig) => {
      setConfiguration(serverConfig);
    });
  }, [socket]);

  const saveConfiguration = (callback) => {
    socket.emit("saveConfiguration", configuration, (res) => {
      if (callback) callback(res);
    });
  };

  return (
    <ConfigurationContext.Provider value={configuration}>
      <SetConfigurationContext.Provider value={setConfiguration}>
        <SaveConfigurationContext.Provider value={saveConfiguration}>
          {children}
        </SaveConfigurationContext.Provider>
      </SetConfigurationContext.Provider>
    </ConfigurationContext.Provider>
  );
}
