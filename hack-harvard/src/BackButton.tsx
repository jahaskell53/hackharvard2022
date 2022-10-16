import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import DropDown from "./DropDown";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const [count, setCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const options = {
    role: ["Student", "Professor"],
    class: ["APMA 1650", "APMA 1651", "APMA 1652"],
    university: ["Brown", "Harvard", "MIT"],
    action: ["Record", "Watch"],
  };

  const navigate = useNavigate();

  const homeIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
</svg>




  const array = [{props: "bg-red-500 hover:bg-red-700", name: "Back", icon: homeIcon}, {props: "bg-red-500 hover:bg-red-700", name: "Back", icon: homeIcon}];

  return (<>
    <button className={`mt-2 ml-2 shadow-md transition-all w-32 rounded-lg font-bold py-2 px-4 rounded text-2xl inline-flex flex items-center gap-2 hover:bg-indigo-400 hover:text-white bg-black-100 hover:border-indigo-400 text-indigo-500 flex flex-row items-center`} onClick={(e) => {
    navigate(-1);
    }}  >
        <div>
        {array[0].icon}
        </div>
        <div>
        {array[0].name}
        </div>
</button>
</>);
}

export default BackButton;