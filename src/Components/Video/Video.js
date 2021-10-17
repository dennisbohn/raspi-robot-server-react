import VideoPlayer from "./VideoPlayer";
import { useSettingsVisible } from "../../Providers/SettingsVisibleProvider";
import "./Video.css";

export default function Video() {
  const settingsVisible = useSettingsVisible();
  function className() {
    let className = "Video";
    if (settingsVisible) className += " settingsVisible";
    return className;
  }
  return (
    <div className={className()}>
      <VideoPlayer />
    </div>
  );
}
