import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import DropDown from "./DropDown";
import { useNavigate } from "react-router-dom";

function EndButton() {
  const [count, setCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const options = {
    role: ["Student", "Professor"],
    class: ["APMA 1650", "APMA 1651", "APMA 1652"],
    university: ["Brown", "Harvard", "MIT"],
    action: ["Record", "Watch"],
  };

  const navigate = useNavigate();

  const homeIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>




  const array = [{props: "bg-red-500 hover:bg-red-700 text-white", name: "Home", icon: homeIcon}, {props: "bg-red-500 hover:bg-red-700 text-white", name: "End", icon: homeIcon}];

  return (<>
    <button className={`shadow-md transition-all rounded-lg font-bold py-2 px-4 rounded text-2xl inline-flex flex items-center gap-2 text-white border border-solid border-white hover:bg-gray-400 hover:text-white bg-black-100`} onClick={(e) => { e.preventDefault();
    navigate("/");
    }}  >
        {array[isClicked ? 1 : 0].icon}
        {array[isClicked ? 1 : 0].name}
</button>
</>);
}

export default EndButton;