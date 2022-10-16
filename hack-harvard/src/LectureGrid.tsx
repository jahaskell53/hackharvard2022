import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import DropDown from "./DropDown";
import HomeButton from "./HomeButton";
import { initializeApp } from "firebase/app";
import { getDocs, getFirestore } from "firebase/firestore";
import { collection, query, where, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPYapXYkdwTze1RvMSwdlBnVf31Hk_7jY",
  authDomain: "platypus-49047.firebaseapp.com",
  projectId: "platypus-49047",
  storageBucket: "platypus-49047.appspot.com",
  messagingSenderId: "727232881257",
  appId: "1:727232881257:web:5fc4ab88016e401f2c78f8"
};
const firebaseapp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseapp);

const fetchData = {
  "university": "Brown",
  "class": "APMA1650"
};

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

function LectureGrid() {

  const [docs, setDocs] = useState([]);

  useEffect(() => {
    async function getData() {
    const q = query(collection(db, "lectures"),
      where("university", "==", fetchData.university),
      where("class", "==", fetchData.class));
    
    getDocs(q).then((foundDocs) => {

      const update_docs = [];
      console.log(foundDocs);
    
    foundDocs.forEach((doc) => {
      update_docs.push(doc);
    });

    const sort_docs = update_docs.sort((a,b) => {
      if (a.data().date < b.data().date)
        return 1;
      if (a.data().date > b.data().date)
        return -1;
      return 0;
    });

    setDocs(sort_docs.map(format_lecture));
    console.log(sort_docs.map(format_lecture));
    });
  }
  getData();
}, []);

  return (
    <div className="w-screen p-10">
        <ul id="headers" className=" gap-3 font-bold mt-8 grid grid-cols-2 text-left border bg-black shadow-lg">
            <li className="p-4 text-white">Lecture</li>
            <li className="p-4 text-white">Date</li>
        </ul>
        <ul>
            {docs.map((lecture) => {
                return (
                    <a href={`watch/lecture?title=${lecture.title}`} className="w-full gap-3 grid-cols-2 grid text-left border hover:bg-gray-200 transition-all">
                        <li className="p-4">{lecture.title}</li>
                        <li className="p-4">{lecture.date}</li>
                    </a>
                )
            })}
        </ul>
    </div>
  );
}

export default LectureGrid;
