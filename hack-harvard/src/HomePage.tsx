import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import DropDown from "./DropDown";
import { Navigate, useNavigate } from "react-router-dom";
import RecordButton from "./RecordButton";
import EndButton from "./EndButton";
import HomeButton from "./HomeButton";
import { Navbar } from "./components/Navbar";

function HomePage() {
  const [count, setCount] = useState(0);
const navigate = useNavigate();

  const options = {
    role: ["Student", "Professor"],
    class: ["APMA 1650", "APMA 1651", "APMA 1652"],
    university: ["Brown", "Harvard", "MIT"],
    action: ["Record", "Watch"],
  };
  const [selected, setSelected] = useState({
    role: "Student",
    class: "APMA 1650",
    university: "Brown",
    action: "Record",
  });


  function handleSubmit(e: Event) {
    e.preventDefault();
    console.log("Submitted", selected);
    switch(selected.action) {
        case "Record":
            navigate("/record");
            break;
        case "Watch":
            navigate("/watch");
            break;
  }
}

function changeSel(name: string, selection: string) {
    setSelected((prev) => {
      return { ...prev, [name]: selection };
    });
  }

  return (
    <div className="w-screen absolute justify-center flex items-center text-center top-1/2 -translate-y-1/2">
      <form>
        <div className="text-4xl text-bold mb-4">
          I am a &nbsp;
          <DropDown initialSelected="Student" options={options.role}
            changeSel={(selection: string) => changeSel("role", selection)}></DropDown>
          at &nbsp;
          <DropDown initialSelected="MIT" options={options.university}
            changeSel={(selection: string) => changeSel("university", selection)}></DropDown>
          in &nbsp;
          <DropDown
            initialSelected="APMA 1650"
            options={options.class}
            changeSel={(selection: string) => changeSel("class", selection)}
          ></DropDown>
          looking to&nbsp;
          <DropDown initialSelected="Record" options={options.action}
            changeSel={(selection: string) => changeSel("action", selection)}></DropDown>
          <br></br>
        </div>
        <button className="hover:bg-indigo-500 transition-all border-indigo-500 border-solid border-2 text-indigo-500 hover:text-white font-bold py-2 px-4 rounded text-2xl" onClick={(e) => handleSubmit(e)}>Go</button></form>
    </div>
  );
}

export default HomePage;
