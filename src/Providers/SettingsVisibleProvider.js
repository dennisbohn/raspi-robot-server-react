import React from "react";

const SettingsVisibleContext = React.createContext();
const SetSettingsVisibleContext = React.createContext();

export function useSettingsVisible() {
  return React.useContext(SettingsVisibleContext);
}

export function useSetSettingsVisible() {
  return React.useContext(SetSettingsVisibleContext);
}

export default function SettingsVisibleProvider({ children }) {
  const [visible, setVisible] = React.useState(false);

  return (
    <SettingsVisibleContext.Provider value={visible}>
      <SetSettingsVisibleContext.Provider value={setVisible}>
        {children}
      </SetSettingsVisibleContext.Provider>
    </SettingsVisibleContext.Provider>
  );
}
