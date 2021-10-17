import Video from "./Components/Video/Video";
import SettingsOverlay from "./Components/Settings/SettingsOverlay";
import OpenSettingsButton from "./Components/Settings/OpenSettingsButton";
import "./App.css";
import Provider from "./Providers/Provider";

function App() {
  return (
    <Provider>
      <Video></Video>
      <SettingsOverlay></SettingsOverlay>
      <OpenSettingsButton></OpenSettingsButton>
    </Provider>
  );
}

export default App;
