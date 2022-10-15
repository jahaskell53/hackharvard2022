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
        <ul id="headers" className="flex gap-3 font-bold text-2xl justify-between mt-8">
            <li className="header">Lecture</li>
            <li className="header">Class</li>
            <li className="header">Date</li>
            <li className="header">Professor</li>
        </ul>
        <hr></hr>

        <ul>
            {lectures.map((lecture) => {

                return (
                    <a href={`watch/lecture-${lecture.id}`} className="flex gap-3 justify-between">
                        <li className="lecture">{lecture.title}</li>
                        <li className="lecture">{lecture.class}</li>
                        <li className="lecture">{lecture.date}</li>
                        <li className="lecture">{lecture.professor}</li>
                    </a>
                )
            })}
        </ul>
    </div>
  );
}

export default LectureGrid;
