import React, { useState, useEffect } from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

const initialState = "";

function Drum() {
  const [text, setText] = useState(initialState);

  const sounds = {
    Q: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    W: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    E: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    A: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    S: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    D: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    Z: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    X: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    C: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  };

  function handleClick(key) {
    setText(sounds[key].split("/").pop().split(".")[0]);
    const audio = document.querySelector(`#${key}`);
    audio.play();
  }
  document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("keydown", (e) => {
      const audio = document.querySelector(`#${e.key.toUpperCase()}`);
      if (audio) {
        audio.currentTime = 0;
        audio.play();
        setText(
          sounds[`${e.key.toUpperCase()}`].split("/").pop().split(".")[0]
        );
        const parentPad = audio.parentNode;
        parentPad.classList.add("active");
        setTimeout(() => {
          parentPad.classList.remove("active");
        }, 200);
      }
    });
  });

  return (
    <div id="drum-machine">
      <div id="pad">
        {Object.keys(sounds).map((key, i) => {
          return (
            <div
              id={i}
              className="drum-pad"
              onClick={() => handleClick(key)}
              tabIndex="0"
            >
              {key}
              <audio
                id={key}
                className="clip"
                src={sounds[key]}
                type="audio/mp3"
              />
            </div>
          );
        })}
      </div>
      <div id="settings">
        <p id="display">{text}</p>
      </div>
    </div>
  );
}

function App() {
  return <Drum />;
}

ReactDOM.render(<App />, document.getElementById("root"));