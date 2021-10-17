import React from "react";
import SettingsVisibleProvider from "./SettingsVisibleProvider";
import SocketProvider from "./SocketProvider";
import ConfigurationProvider from "./ConfigurationProvider";

export default function Provider({ children }) {
  return (
    <SettingsVisibleProvider>
      <SocketProvider>
        <ConfigurationProvider>{children}</ConfigurationProvider>
      </SocketProvider>
    </SettingsVisibleProvider>
  );
}
