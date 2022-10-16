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
import axios from "axios"
import BackButton from "./BackButton";

function Lecture() {
  const [count, setCount] = useState(0);

  const [docs, setDocs] = useState([]);
  const [thing, setThing] = useState({"university": "Brown", "class": "APMA1650", "title": "Lecture 1"});

  const [params, setParams] = useSearchParams();
  const [speechToText, setSpeechToText] = useState({chapters:[], text:"Loading..."})

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
        const qry = query(collection(db, "lectures"),
                where("title", "==", fetchData.title));
        const assembly = axios.create({
      baseURL: "https://api.assemblyai.com/v2",
      headers: {
          authorization: "0daee8a3236348678195040d20b89b83",
        " content-type": "application/json",
      },
  });
            var foundLectures = 0;
            getDocs(qry).then((foundDocs) => {
            foundDocs.forEach(async (doc) => {
                foundLectures++;
                if (foundLectures == 1) {
                    const transcriptId = doc.data().id;
                    //const transcriptId = "rkfaoq5a8w-cbca-4c57-b98e-f30e5f076bb0";
                    console.log("awaiting promise")
                    console.log("done")
                    assembly
                        .get("/transcript/"+transcriptId)
                        .then((res) => {console.log(res.data); setSpeechToText({text: res.data.text, chapters: res.data.chapters})})
                        .catch((err) => console.error(err));
                    
                }
            })
            });
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
  //   function getLectureById(id: string) {
  //     return lectures.find(lecture => lecture.id === id);
  //   }

 

  return (
    <><BackButton></BackButton><div className="w-screen mx-auto px-20 flex flex-col">
          <h1 className="pt-10 text-4xl font-bold">
              {title} Recording
          </h1>
          {thing && 
          <div className="pt-4 pb-3 text-xl text-gray-600 flex self-center align-center flex-row gap-10">
              <div>{thing.university}</div>
              <div className="">
                  {thing.class}
              </div>
          </div>}

          <hr></hr>
          <p className="mt-4">Transcript:</p> <p className="text-left">{speechToText.text}</p>
          <ul id="headers" className=" gap-3 font-bold mt-8 grid grid-cols-5 text-left border bg-black shadow-lg">
              <li className="p-4 text-white">Summary</li>
              <li className="p-4 text-white">Headline</li>
              <li className="p-4 text-white">Gist</li>
              <li className="p-4 text-white">Start</li>
              <li className="p-4 text-white">End</li>
          </ul>
          {speechToText.chapters.map((chapter) => {
              return (
                  <ul className="grid grid-cols-5">
                      <li className="p-4">{chapter.summary}</li>
                      <li className="p-4">{chapter.headline}</li>
                      <li className="p-4">{chapter.gist}</li>
                      <li className="p-4">{Math.floor(Math.floor(chapter.start / 1000) / 60) < 10 && 0}{Math.floor(Math.floor(chapter.start / 1000) / 60)}:{Math.floor(chapter.start / 1000) % 60 < 10 && 0}{Math.floor(chapter.start / 1000) % 60}</li>
                      <li className="p-4">{Math.floor(Math.floor(chapter.end / 1000) / 60) < 10 && 0}{Math.floor(Math.floor(chapter.end / 1000) / 60)}:{Math.floor(chapter.end / 1000) % 60 < 10 && 0}{Math.floor(chapter.end / 1000) % 60}</li>
                  </ul>);
          })}
      </div></>
  );
}

export default Lecture;
