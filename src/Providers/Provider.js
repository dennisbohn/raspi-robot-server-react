import React from "react";
import SocketProvider from "./SocketProvider";
import SettingsVisibleProvider from "./SettingsVisibleProvider";

export default function Provider({ children }) {
  return (
    <SettingsVisibleProvider>
      <SocketProvider>{children}</SocketProvider>
    </SettingsVisibleProvider>
  );
}
