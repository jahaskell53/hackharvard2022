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

  return (
    <>
      <>
        <HomeButton></HomeButton>
        <>
          <h1>APMA 1650 Lecture 2</h1>
        </>
      </>
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
    </>
  );
}

export default LectureGrid;
