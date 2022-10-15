import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import DropDown from "./DropDown";
import HomeButton from "./HomeButton";

function LectureGrid() {
  const [count, setCount] = useState(0);
  const options = {
    role: ["Student", "Professor"],
    class: ["APMA 1650", "APMA 1651", "APMA 1652"],
    university: ["Brown", "Harvard", "MIT"],
    action: ["Record", "Watch"],
  };

  const lectures = [
    {
      title: "Lecture 1",
      id: "1",
      class: "APMA 1650",
      date: "2021-01-01",
      professor: "Professor 1",

    },
    {
      title: "Lecture 2",
      id: "2",
      class: "APMA 1650",
      date: "2021-01-01",
      professor: "Professor 1",
    },
    {
      title: "Lecture 3",
      id: "3",
      class: "APMA 1650",
      date: "2021-01-01",
      professor: "Professor 1",
    },
  ]

  return (
    <div className="w-screen p-10">
        <ul id="headers" className=" gap-3 font-bold text-2xl mt-8 grid grid-cols-4 text-left border bg-black">
            <li className="p-4 text-white">Lecture</li>
            <li className="p-4 text-white">Class</li>
            <li className="p-4 text-white">Date</li>
            <li className="p-4 text-white">Professor</li>
        </ul>
        <hr></hr>
        <ul>
            {lectures.map((lecture) => {

                return (
                    <a href={`watch/lecture-${lecture.id}`} className="w-full gap-3 grid-cols-4 grid text-left border">
                        <li className="p-4">{lecture.title}</li>
                        <li className="p-4">{lecture.class}</li>
                        <li className="p-4">{lecture.date}</li>
                        <li className="p-4">{lecture.professor}</li>
                    </a>
                )
            })}
        </ul>
    </div>
  );
}

export default LectureGrid;
