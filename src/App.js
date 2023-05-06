import React, { useState } from "react";

function App() {
  return (
    <div className="App">
      <ChoiceGenerator />
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

  return (
    <div className="ChoiceGenerator">
      <UserInputForm onSubmit={generateChoice} />
      {generatedChoice && <GeneratedChoice choice={generatedChoice} />}
    </div>
  );
}

function UserInputForm(props) {
  const [textInput, setTextInput] = useState("");
  const [optionList, setOptionList] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    const options = parseOptions(textInput);
    props.onSubmit(optionList);
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
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="textInput">Enter options:</label>
        <textarea
          id="textInput"
          value={textInput}
          onChange={handleTextInputChange}
          className="form-control"
          rows="4"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Generate Choice
      </button>
      {optionList.length > 0 && (
        <div className="mt-3">
          <p>You have entered the following options:</p>
          <ul>
            {optionList.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}

function GeneratedChoice(props) {
  return (
    <div className="GeneratedChoice">
      <p>The generated choice is: {props.choice}</p>
    </div>
  );
}

export default App;
