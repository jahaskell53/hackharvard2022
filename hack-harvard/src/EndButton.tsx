import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import DropDown from "./DropDown";

function EndButton() {
  const [count, setCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const options = {
    role: ["Student", "Professor"],
    class: ["APMA 1650", "APMA 1651", "APMA 1652"],
    university: ["Brown", "Harvard", "MIT"],
    action: ["Record", "Watch"],
  };

  const endButton = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
</svg>



  const array = [{props: "bg-red-500 hover:bg-red-700 text-white", name: "End", icon: endButton}, {props: "bg-red-500 hover:bg-red-700 text-white", name: "End", icon: endButton}];

  return (<>
    <button className={`shadow-md transition-all rounded-lg font-bold py-2 px-4 rounded text-2xl inline-flex flex items-center gap-2 ${array[isClicked ? 1 : 0].props}`} onClick={(e) => { e.preventDefault();
    setIsClicked(!isClicked)}}>
        {array[isClicked ? 1 : 0].icon}
        {array[isClicked ? 1 : 0].name}
</button>
</>);
}

export default EndButton;