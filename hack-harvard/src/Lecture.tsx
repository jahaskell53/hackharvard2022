import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import DropDown from "./DropDown";
import HomeButton from "./HomeButton";
import { useParams } from "react-router-dom";

function LectureGrid() {
  const [count, setCount] = useState(0);
  const options = {
    role: ["Student", "Professor"],
    class: ["APMA 1650", "APMA 1651", "APMA 1652"],
    university: ["Brown", "Harvard", "MIT"],
    action: ["Record", "Watch"],
  };

  const { lectureId } = useParams();
  console.log("lectureId", lectureId);

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
  ];
  function getLectureById(id: string) {
    return lectures.find(lecture => lecture.id === id);
  }

  const lecture = getLectureById(lectureId!.split("lecture-")[1]);
  return (
    <div className="w-screen mx-auto px-20">
      <h1 className="p-10 text-4xl font-bold">
        {lecture!.class} {lecture!.title}
      </h1>
      <p className="text-left mt-10">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam
        dicta alias reiciendis rerum? Esse minus, laboriosam repellendus
        deleniti, inventore consectetur minima pariatur saepe dolores tempore
        recusandae soluta odit cumque debitis adipisci, nobis quae unde illum
        tempora sunt! Molestias ad esse provident modi assumenda voluptate totam
        quibusdam commodi. Iste amet tempora repellat error mollitia quibusdam,
        enim expedita assumenda ipsa. Vel nobis minima non asperiores cum saepe
        quasi facilis, tempore itaque nulla sequi sed quam officiis blanditiis
        eos voluptate, obcaecati neque pariatur deleniti rem consequuntur.
        Commodi nisi voluptatibus, soluta, consequuntur facilis reiciendis
        repellendus neque in explicabo accusamus eveniet sequi, quod voluptate!
        Aspernatur.
      </p>
    </div>
  );
}

export default LectureGrid;
