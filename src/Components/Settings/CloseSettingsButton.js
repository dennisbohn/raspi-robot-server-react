import { useSetSettingsVisible } from "../../Providers/SettingsVisibleProvider";
import "./CloseSettingsButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function CloseSettingsButton() {
  const setSettingsVisible = useSetSettingsVisible();
  const closeSettings = () => {
    setSettingsVisible(false);
  };
  return (
    <div className="CloseSettingsButton">
      <FontAwesomeIcon icon={faTimes} color="#000" onClick={closeSettings} />
    </div>
  );
}
