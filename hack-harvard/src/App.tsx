import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import DropDown from "./DropDown";

import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import Record from "./Record";
import LectureGrid from "./LectureGrid";
import HomeButton from "./HomeButton";
import APITest from "./APITest"
import { Navbar } from "./components/Navbar";
import Lecture from "./Lecture";

function App() {
  const isHome = window.location.pathname === "/";
  return (
    <div className="App flex flex-col h-screen w-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/record" element={<Record />} />
        <Route path="/record/:lectureId" element={<Record />} />
        <Route path="/watch" element={<LectureGrid />} />
        <Route path="/apitest" element={<APITest />} />
        <Route path="/watch/:lectureId" element={<Lecture />} />
      </Routes>
    </div>
  );
}

export default App;
