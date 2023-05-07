import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { FaGlobe, FaHeart } from "react-icons/fa";

function App() {
  return (
    <div className="App">
      <div className="container">
        <ChoiceGenerator />
      </div>
      <footer
        className="text-center  text-light"
        style={{
          backgroundColor: " rgba(32, 25, 25, 0.254)",
          padding: "10px",
        }}
      >
        <p style={{ fontSize: "14px", marginBottom: "5px" }}>
          Designed and developed with
          <FaHeart style={{ fill: "#87ceeb" }} /> by Khrystyna T.
        </p>
        <p style={{ fontSize: "12px", marginBottom: "5px" }}>
          Connect with me on LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/tyvoniuk-khrystyna/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Khrystyna T.
          </a>
        </p>
        <p style={{ fontSize: "10px", color: "#fff" }}>
          © 2023 Khrystyna T. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function ChoiceGenerator() {
  const [generatedChoice, setGeneratedChoice] = useState(null);

  function generateChoice(options) {
    const randomIndex = Math.floor(Math.random() * options.length);
    const choice = options[randomIndex];
    setGeneratedChoice(choice);
  }

  function handleStartOver() {
    setGeneratedChoice(null);
  }

  return (
    <div className="ChoiceGenerator">
      {generatedChoice ? (
        <GeneratedChoice choice={generatedChoice} onRestart={handleStartOver} />
      ) : (
        <UserInputForm onSubmit={generateChoice} />
      )}
    </div>
  );
}

function UserInputForm(props) {
  const [textInput, setTextInput] = useState("");
  const [optionList, setOptionList] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    const options = parseOptions(textInput);
    props.onSubmit(options);
    setOptionList(options);
  }

  function handleTextInputChange(event) {
    setTextInput(event.target.value);
    const options = parseOptions(event.target.value);
    setOptionList(options);
  }

  function parseOptions(inputString) {
    let options = [];
    const separators = /[\n,.]/g;
    const trimmedInput = inputString.trim();
    if (trimmedInput.length > 0) {
      options = trimmedInput.split(separators).map((option) => option.trim());
    }
    return options;
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto text-center">
      <div className="form-group">
        <label
          htmlFor="textInput"
          className="  mb-3 fs-3"
          style={{ color: "rgba(37, 39, 87)" }}
        >
          Enter options:
        </label>
        <textarea
          id="textInput"
          value={textInput}
          onChange={handleTextInputChange}
          className="form-control bg-transparent customized-border "
          rows="4"
          style={{ color: "rgba(37, 39, 87, 0.735)" }}
        />
      </div>
      <button type="submit" className="mt-3 btn btn-lg customized-btn fs-3">
        Generate Choice
      </button>
      {optionList.length > 0 && (
        <div className="mt-3">
          <p className="text-light  fs-4 ">
            You have entered the following options:
          </p>
          <ul className="text-light fs-5 ">
            {optionList.map((option, index) => (
              <li className="list-unstyled" key={index}>
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}

function GeneratedChoice(props) {
  const { choice, onRestart } = props;

  return (
    <div className="GeneratedChoice">
      <p>The generated choice is: {choice}</p>
      <StartOverButton onClick={onRestart} />
    </div>
  );
}
// created a button that gets activated after the used generates his choice.
const StartOverButton = ({ onClick }) => {
  return (
    <button
      className="start-over-btn"
      onClick={onClick}
      style={{
        background: "transparent",
        border: "none",
        color: "white",
        cursor: "pointer",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <FaGlobe style={{ marginRight: "10px" }} />
      Start Over
    </button>
  );
};

export default App;
