import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import DropDown from "./DropDown";
import { Navigate, useNavigate } from "react-router-dom";
import RecordButton from "./RecordButton";
import EndButton from "./EndButton";
import HomeButton from "./HomeButton";
import { Navbar } from "./components/Navbar";
import { collection, query, where, Timestamp, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

function HomePage() {
  const [count, setCount] = useState(0);
const navigate = useNavigate();

  const options = {
    role: ["Student", "Professor"],
    class: ["APMA 1650", "APMA 1651", "APMA 1652"],
    university: ["Brown", "Harvard", "MIT"],
    action: ["Record", "Watch"],
  };
  const [selected, setSelected] = useState({
    role: "Student",
    class: "APMA 1650",
    university: "Brown",
    action: "Record",
  });
  interface FetchData {
    university: string;
    class: string;
  }

  const fetchData: FetchData = {
    "university": "Brown",
    "class": "APMA1650"
  };

  const firebaseConfig = {
    apiKey: "AIzaSyDPYapXYkdwTze1RvMSwdlBnVf31Hk_7jY",
    authDomain: "platypus-49047.firebaseapp.com",
    projectId: "platypus-49047",
    storageBucket: "platypus-49047.appspot.com",
    messagingSenderId: "727232881257",
    appId: "1:727232881257:web:5fc4ab88016e401f2c78f8"
  };

  // TODO: use env variables for keys
  const firebaseapp = initializeApp(firebaseConfig);
// TODO: create context for firestore
const db = getFirestore(firebaseapp);

const [docs, setDocs] = useState([]);

function format_date(raw_date) {
    let date = new Date(raw_date.seconds * 1000);
    return ''+(1+date.getMonth())+'/'+date.getDate()+'/'+date.getFullYear() + ' ' + date.getHours()+':'+date.getMinutes();
  }
function format_lecture(doc) {
    const data = doc.data();
    return {
      title: data.title,
      date: format_date(data.date),
      key: data.id
    };
  }

  async function getLectureData(fetchData: FetchData) {
    // TODO: replace this with general
    const q = query(collection(db, "lectures"),
      where("university", "==", fetchData.university),
      where("class", "==", fetchData.class));
    
    const foundDocs = await getDocs(q);     
      const update_docs = [];
      console.log(foundDocs);
    
    foundDocs.forEach((doc) => {
      update_docs.push(doc);
    });

    setDocs(update_docs.map(format_lecture));
    console.log(update_docs.map(format_lecture));
    const thing = update_docs.map(format_lecture);
    return thing;
    };



  async function handleSubmit(e: Event) {
    e.preventDefault();
    console.log("Submitted", selected);
    switch(selected.action) {
        case "Record":
            const lecture = await getLectureData(fetchData);
            // TODO: create id for lecture in firestore
            const lectureId = lecture[0].id;
            console.log("lecture", lectureId);
            navigate(`/record/lecture-${lectureId}`);
            break;
        case "Watch":
            navigate("/watch");
            break;
  }
}

function changeSel(name: string, selection: string) {
    setSelected((prev) => {
      return { ...prev, [name]: selection };
    });
  }

  return (
    <div className="w-screen h-full justify-center flex items-center text-center font-bold bg-white">
      <form>
        <div className="text-4xl text-bold mb-4">
          I am a &nbsp;
          <DropDown initialSelected="Student" options={options.role}
            changeSel={(selection: string) => changeSel("role", selection)}></DropDown>
          at &nbsp;
          <DropDown initialSelected="MIT" options={options.university}
            changeSel={(selection: string) => changeSel("university", selection)}></DropDown>
          in &nbsp;
          <DropDown
            initialSelected="APMA 1650"
            options={options.class}
            changeSel={(selection: string) => changeSel("class", selection)}
          ></DropDown>
          looking to&nbsp;
          <DropDown initialSelected="Record" options={options.action}
            changeSel={(selection: string) => changeSel("action", selection)}></DropDown>
          <br></br>
        </div>
        <button className="hover:bg-indigo-500 transition-all border-indigo-500 border-solid border-2 text-indigo-500 hover:text-white font-bold py-2 px-4 rounded text-2xl" onClick={(e) => handleSubmit(e)}>Go</button></form>
    </div>
  );
}

export default HomePage;
