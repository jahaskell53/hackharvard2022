import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import DropDown from "./DropDown";
import HomeButton from "./HomeButton";
import { useParams, useSearchParams } from "react-router-dom";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

function Lecture() {
  const [count, setCount] = useState(0);

  const [docs, setDocs] = useState([]);
  const [thing, setThing] = useState({"university": "Brown", "class": "APMA1650", "title": "Lecture 1"});

  const [params, setParams] = useSearchParams();
  const options = {
    role: ["Student", "Professor"],
    class: ["APMA 1650", "APMA 1651", "APMA 1652"],
    university: ["Brown", "Harvard", "MIT"],
    action: ["Record", "Watch"],
  };

  const firebaseConfig = {
    apiKey: "AIzaSyDPYapXYkdwTze1RvMSwdlBnVf31Hk_7jY",
    authDomain: "platypus-49047.firebaseapp.com",
    projectId: "platypus-49047",
    storageBucket: "platypus-49047.appspot.com",
    messagingSenderId: "727232881257",
    appId: "1:727232881257:web:5fc4ab88016e401f2c78f8",
  };
  const firebaseapp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseapp);
  function format_date(raw_date) {
    let date = new Date(raw_date.seconds * 1000);
    return ''+(1+date.getMonth())+'/'+date.getDate()+'/'+date.getFullYear() + ' ' + date.getHours()+':'+date.getMinutes();
  }

  function format_lecture(doc) {
    const data = doc.data();
    return {
      title: data.title,
      date: format_date(data.date),
      id: data.id,
      university: data.university,
      class: data.class
    };
  }
  
  useEffect(() => {
    async function getLectureDataByTitle(fetchData) {
        // TODO: replace this with general
        const q = query(
          collection(db, "lectures"),
          where("title", "==", fetchData.title)
        );
    
        const foundDocs = await getDocs(q);
        const update_docs = [];
        console.log(foundDocs);
    
        foundDocs.forEach(doc => {
          update_docs.push(doc);
        });
    
        setDocs(update_docs.map(format_lecture));
        console.log(update_docs.map(format_lecture));
        const thing = update_docs.map(format_lecture);
        return thing[0];
      }
      getLectureDataByTitle({ title: title }).then(stuff => {
        console.log(stuff);
        setThing(stuff)
      })
      console.log("thing, thing")
    //   setThing(result);
  }, [])
 

  const title = params.get("title");

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
  //   function getLectureById(id: string) {
  //     return lectures.find(lecture => lecture.id === id);
  //   }

 

  return (
    <div className="w-screen mx-auto px-20 flex flex-col">
      <h1 className="pt-10 text-4xl font-bold">
        {title} Recording
      </h1>
      <div className="pt-4 pb-3 text-xl text-gray-600 flex self-center align-center flex-row gap-10">
        <div>{thing.university}</div>
        <div className="">
        {thing.class}
      </div>
      </div>
     
      <hr></hr>
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

export default Lecture;
