import React, { useEffect } from "react";
import "./SettingsControl.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSocket } from "../../Providers/SocketProvider";

var configuration = {};
const buttons = {
  upleft: "Oben + Links",
  up: "Oben",
  upright: "Oben + Rechts",
  right: "Rechts",
  downright: "Unten + Rechts",
  down: "Unten",
  downleft: "Unten + Links",
  left: "Links",
  space: "Leertaste",
  enter: "Enter",
};
const pins = [
  {
    pin: 7,
    label: "GPIO4",
  },
  {
    pin: 21,
    label: "GPIO5",
  },
  {
    pin: 22,
    label: "GPIO6",
  },
  {
    pin: 11,
    label: "GPIO7",
  },
  {
    pin: 10,
    label: "GPIO8",
  },
  {
    pin: 13,
    label: "GPIO9",
  },
  {
    pin: 12,
    label: "GPIO10",
  },
  {
    pin: 14,
    label: "GPIO11",
  },
  {
    pin: 26,
    label: "GPIO12",
  },
  {
    pin: 23,
    label: "GPIO13",
  },
  {
    pin: 15,
    label: "GPIO14",
  },
  {
    pin: 16,
    label: "GPIO15",
  },
  {
    pin: 27,
    label: "GPIO16",
  },
  {
    pin: 0,
    label: "GPIO17",
  },
  {
    pin: 1,
    label: "GPIO18",
  },
  {
    pin: 24,
    label: "GPIO19",
  },
  {
    pin: 28,
    label: "GPIO20",
  },
  {
    pin: 29,
    label: "GPIO21",
  },
  {
    pin: 3,
    label: "GPIO22",
  },
  {
    pin: 4,
    label: "GPIO23",
  },
  {
    pin: 5,
    label: "GPIO24",
  },
  {
    pin: 6,
    label: "GPIO25",
  },
  {
    pin: 25,
    label: "GPIO26",
  },
  {
    pin: 2,
    label: "GPIO27",
  },
];

export default function SettingsControl() {
  const socket = useSocket();

  const [pinlist, setPinlist] = React.useState([]);
  const [activeButton, setActiveButton] = React.useState(null);

  useEffect(() => {
    socket.emit("getConfiguration", (serverConfig) => {
      configuration = serverConfig;
    });
  }, [socket]);

  const changeActiveButton = (e) => {
    const key = e.target.value;
    setActiveButton(key);
    if (!configuration.pinlist) configuration.pinlist = {};
    if (!configuration.pinlist[key]) configuration.pinlist[key] = [];
    if (key) {
      setPinlist(configuration.pinlist[key]);
    } else {
      setPinlist([]);
    }
  };

  const changePin = (index) => {
    return (e) => {
      const newPinlist = [...pinlist];
      newPinlist[index].pin = e.target.value;
      updatePinlist(newPinlist);
    };
  };

  const changeValue = (index, emptyToZero) => {
    return (e) => {
      var value = e.target.value;
      const number = parseInt(value);
      if (value !== "" && (isNaN(number) || number < 0 || number >= 256))
        return;
      if (emptyToZero && value === "") value = 0;
      const newPinlist = [...pinlist];
      newPinlist[index].value = value;
      updatePinlist(newPinlist);
    };
  };

  const deletePin = (index) => {
    return (e) => {
      const newPinlist = [...pinlist];
      newPinlist.splice(index, 1);
      updatePinlist(newPinlist);
    };
  };

  const updatePinlist = (pinlist) => {
    setPinlist(pinlist);
    configuration.pinlist[activeButton] = pinlist;
    socket.emit("updateConfiguration", configuration);
  };

  const addPin = () => {
    const newPinlist = [
      ...pinlist,
      {
        pin: "",
        value: 255,
      },
    ];

    updatePinlist(newPinlist);
  };

  const saveControlConfig = (e) => {
    e.target.disabled = true;
    socket.emit("saveConfiguration", (res) => {
      if (res) e.target.disabled = false;
    });
  };

  return (
    <div className="SettingsControl widget">
      <h3>Steuerung</h3>
      <div className="box">
        <h4>Taste</h4>
        <select onChange={changeActiveButton}>
          <option value="">--- Taste wählen ---</option>
          {Object.entries(buttons).map((value) => (
            <option key={value[0]} value={value[0]}>
              {value[1]}
            </option>
          ))}
        </select>
      </div>
      {activeButton && (
        <>
          <FontAwesomeIcon icon={faChevronDown} color="#000" />
          <div className="box">
            <h4>Pins</h4>
            {pinlist.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>Pin</th>
                    <th>Wert</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {pinlist.map((pin, index) => (
                    <tr key={index}>
                      <td>
                        <select onChange={changePin(index)} value={pin.pin}>
                          <option value="">-- Pin wählen --</option>
                          {pins.map((pin) => (
                            <option key={pin.pin} value={pin.pin}>
                              {pin.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          type="number"
                          value={pin.value}
                          onBlur={changeValue(index, true)}
                          onChange={changeValue(index, false)}
                          min="0"
                          max="255"
                        />
                      </td>
                      <td className="icons">
                        <FontAwesomeIcon
                          icon={faTrash}
                          color="#c00"
                          onClick={deletePin(index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <button onClick={addPin}>Pin hinzufügen</button>
          </div>
        </>
      )}
      <div className="save">
        <button onClick={saveControlConfig}>auf Server speichern</button>
      </div>
    </div>
  );
}
