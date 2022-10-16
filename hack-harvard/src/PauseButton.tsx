import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import DropDown from "./DropDown";

function PauseButton({isRecording, pauseRecording, resumeRecording, setIsRecording}) {
  const [count, setCount] = useState(0);
//   const [isClicked, setIsClicked] = useState(false);
  const options = {
    role: ["Student", "Professor"],
    class: ["APMA 1650", "APMA 1651", "APMA 1652"],
    university: ["Brown", "Harvard", "MIT"],
    action: ["Record", "Watch"],
  };
  const recordIcon =  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
  <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
</svg>

  const pauseIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
</svg>

const resumeIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
<path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
</svg>



  const array = [{props:"bg-blue-500 hover:bg-blue-700 text-white" , name: "Pause", icon: pauseIcon}, {props:  "bg-indigo-500 hover:bg-indigo-700 text-white", name: "Resume", icon: resumeIcon}];

  return (<>
    <button className={`shadow-md transition-all rounded-lg font-bold py-2 px-4 rounded text-2xl inline-flex flex items-center gap-2 ${array[isRecording == "paused" ? 1 : 0].props}`}
    onClick={(e) => { 
      e.preventDefault();
      if (isRecording == "paused"){
        resumeRecording();
      } else {
        pauseRecording();
      } 
      }}>
      {array[isRecording == "paused" ? 1 : 0].icon}
      {array[isRecording == "paused" ? 1 : 0].name}
</button>
</>);
}

export default PauseButton;