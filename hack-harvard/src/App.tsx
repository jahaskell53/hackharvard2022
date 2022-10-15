import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import DropDown from "./DropDown";

import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import Record from "./Record";
import Watch from "./Watch";

function App() {

  return (
<div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/record" element={<Record />} />
        <Route path="/watch" element={<Watch />} />
      </Routes>
    </div>
  );  
}

export default App;
