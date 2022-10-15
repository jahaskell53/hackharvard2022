import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import DropDown from "./DropDown";

function HomePage() {
  const [count, setCount] = useState(0);
  const options = {
    role: ["Student", "Professor"],
    class: ["APMA 1650", "APMA 1651", "APMA 1652"],
    university: ["Brown", "Harvard", "MIT"],
    action: ["Record", "Watch"],
  };

  return (
    <div className="h-screen justify-center flex items-center text-center">
      <div className="text-4xl my-auto mx">
        I am a &nbsp;
        <DropDown initialSelected="Student" options={options.role}></DropDown>
        at &nbsp;
        <DropDown initialSelected="MIT" options={options.university}></DropDown>
        in{" "}
        <DropDown
          initialSelected="APMA 1650"
          options={options.class}
        ></DropDown>
        looking to&nbsp;
        <DropDown initialSelected="Record" options={options.action}></DropDown>
        <br></br>
      </div>
    </div>
  );
}

export default HomePage;
