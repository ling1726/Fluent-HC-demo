import * as React from "react";
import "./App.css";
import { ConvergedDemo } from "./ConvergedDemo";
import { NorthstarDemo } from "./NorthstarDemo";

const getForcedFromLocalStorage = () => {
  return window.localStorage.getItem("forced") === "true";
};

const setForcedToLocalStorage = (forced: boolean) => {
  return window.localStorage.setItem("forced", forced.toString());
};

function App() {
  const [forced, setForced] = React.useState(() => getForcedFromLocalStorage());

  React.useMemo(() => {
    if (forced) {
      // @ts-ignore
      document.documentElement.style["forced-color-adjust"] = "unset";
    } else {
      // @ts-ignore
      document.documentElement.style["forced-color-adjust"] = "none";
    }
  }, [forced]);

  const onChange = () => {
    setForced((s) => {
      const newState = !s;
      setForcedToLocalStorage(newState);
      return newState;
    });
  };

  return (
    <div className="App">
      <h1>Fluent high contrast demo</h1>
      <label htmlFor="forced" style={{display: 'flex', alignItems: 'center', gap: 20}}>
        Use forced windows high contrast mode
        <input
          id="forced"
          type="checkbox"
          onChange={onChange}
          checked={forced}
        />
      </label>
      <h2>Fluent UI northstar</h2>
      <NorthstarDemo forced={forced} />
      <h2>Fluent UI v9</h2>
      <ConvergedDemo forced={forced} />
    </div>
  );
}

export default App;
