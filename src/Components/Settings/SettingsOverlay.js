import { useSettingsVisible } from "../../Providers/SettingsVisibleProvider";
import CloseSettingsButton from "./CloseSettingsButton";
import SettingsControl from "./SettingsControl";
import "./SettingsOverlay.css";

export default function SettingsOverlay() {
  const settingsVisible = useSettingsVisible();
  function className() {
    let className = "SettingsOverlay";
    if (settingsVisible) className += " visible";
    return className;
  }
  return (
    <div className={className()}>
      <h2>Einstellungen</h2>
      <SettingsControl />
      <CloseSettingsButton />
    </div>
  );
}
