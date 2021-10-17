import { useSetSettingsVisible } from "../../Providers/SettingsVisibleProvider";
import "./OpenSettingsButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

export default function OpenSettingsButton() {
  const setSettingsVisible = useSetSettingsVisible();
  const openSettings = () => {
    setSettingsVisible(true);
  };
  return (
    <div className="OpenSettingsButton">
      <FontAwesomeIcon icon={faCog} color="#fff" onClick={openSettings} />
    </div>
  );
}
