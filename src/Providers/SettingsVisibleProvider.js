import React from "react";

const SettingsVisibleContext = React.createContext();
const SettingsSetVisibleContext = React.createContext();

export function useSettingsVisible() {
  return React.useContext(SettingsVisibleContext);
}

export function useSetSettingsVisible() {
  return React.useContext(SettingsSetVisibleContext);
}

export default function SettingsVisibleProvider({ children }) {
  const [visible, setVisible] = React.useState(false);

  return (
    <SettingsVisibleContext.Provider value={visible}>
      <SettingsSetVisibleContext.Provider value={setVisible}>
        {children}
      </SettingsSetVisibleContext.Provider>
    </SettingsVisibleContext.Provider>
  );
}
