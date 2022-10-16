import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import DropDown from "./DropDown";
import RecordButton from "./RecordButton";
import HomeButton from "./HomeButton";
import EndButton from "./EndButton";
import PauseButton from "./PauseButton";
import useRecorder from "./AudioHelper";
import { useParams, useSearchParams } from "react-router-dom";
import date from 'date-and-time';
import axios from "axios"
import { initializeApp } from "firebase/app";
import { getDocs, getFirestore } from "firebase/firestore";
import { collection, addDoc, query, where, Timestamp } from "firebase/firestore";

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}

function Record() {
    const [searchParams, setSearchParams] = useSearchParams();
    const university = searchParams.get("university");
    const className = searchParams.get("class");
    const title = searchParams.get("title");
    const [speechToText, setSpeechToText] = useState({chapters:[], text:"Record a lecture to begin transcription!"})

  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState("stopped");
  const [recorder, setRecorder] = useState<MediaRecorder|null>(null);

  const [time, setTime] = useState(0);  
    // const id = lectureId?.split("lecture-")[1];

    const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

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

  const assembly = axios.create({
      baseURL: "https://api.assemblyai.com/v2",
      headers: {
          authorization: "0daee8a3236348678195040d20b89b83",
        " content-type": "application/json",
      },
  });

  
  useEffect(() => {
    let interval = null;
  
    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);
  
  
  
  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    console.log(isRecording)
    if (recorder === null) {
      if (isRecording == "started") {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (isRecording == "started") {
      recorder.start();
    } else if (isRecording == "paused") {
      recorder.pause();
    } else if (isRecording == "resumed") {
        recorder.resume()
    } else {
      recorder.stop()
    }

    // Obtain the audio when ready.
    function uploadAudio(blob) {

      const recordClass = "APMA1650";
      assembly
      .post("/upload", blob)
      .then((res) => 
      assembly
          .post("/transcript", {
              audio_url: res.data.upload_url,
              auto_chapters: true
          })
          .then((res) => {
              console.log(res.data.id);
              let dateObj = new Date();
                  const defaultTitle = recordClass+" "+
                  (dateObj.getMonth()+1)+'/'+dateObj.getDate()+'/'+dateObj.getFullYear()
                  + " " + dateObj.getHours()+":"+dateObj.getMinutes();
              const docData = {
                  "university": "Brown",
                  "class": "APMA1650",
                  "title": defaultTitle,
                  "id": res.data.id,
                  "date": Timestamp.now()
              };
              addDoc(collection(db, "lectures"), docData);
              const fetchData = {
                "university": "Brown",
                "class": "APMA1650",
                "title": defaultTitle
            };
            const q = query(collection(db, "lectures"),
                where("university", "==", fetchData.university),
                where("class", "==", fetchData.class),
                where("title", "==", fetchData.title));
            var foundLectures = 0;
            getDocs(q).then((foundDocs) => {
            foundDocs.forEach(async (doc) => {
                foundLectures++;
                if (foundLectures == 1) {
                    const transcriptId = doc.data().id;
                    //const transcriptId = "rkfaoq5a8w-cbca-4c57-b98e-f30e5f076bb0";
                    console.log("awaiting promise")
                    await new Promise(r => setTimeout(r, 30000));
                    console.log("done")
                    assembly
                        .get("/transcript/"+transcriptId)
                        .then((res) => {console.log(res.data); setSpeechToText({text: res.data.text, chapters: res.data.chapters})})
                        .catch((err) => console.error(err));
                    
                }
            })
            });
          })
      )
  }

    const handleData = (e : Blob) => {
      setAudioURL(URL.createObjectURL(e.data));
      const audio = new Audio(URL.createObjectURL(e.data));
      audio.play();
      uploadAudio(e.data);
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording("started");
    setIsActive(true);
    setIsPaused(false);         
  };

  const stopRecording = () => {
    setIsRecording("stopped");
    setIsActive(false);
    setTime(0);

  };
  
  const pauseRecording = () => {
    setIsRecording("paused");
    setIsPaused(true);
  }

  const resumeRecording = () => {
    setIsRecording("resumed");
    setIsPaused(false);

  }

  return (
    <div className="w-screen p-10">
      <h1 className="text-4xl my-8">{title} Recording</h1>
      <h1 className="text-4xl my-8">{className} </h1>
      <h1 className="text-4xl my-8">{university} </h1>
      <div className="flex flex-row gap-5 justify-center">
    {((isRecording == "started") || (isRecording == "paused") || (isRecording == "resumed") ) ? <PauseButton isRecording={isRecording} pauseRecording={pauseRecording} resumeRecording={resumeRecording} setIsRecording={setIsRecording}></PauseButton> : <RecordButton isRecording={isRecording} startRecording={startRecording}/>}
          {(isRecording == "started" || isRecording == "paused" || isRecording == "resumed") && <EndButton stopRecording={stopRecording}/>}
          </div>
          <p className="mt-6 text-2xl mb-6">{Math.floor(Math.floor(time / 1000)/60) < 10 && 0}{Math.floor(Math.floor(time / 1000)/60)}:{Math.floor(time / 1000) % 60 <10 && 0}{Math.floor(time / 1000) % 60}</p>
          <p className="text-left">{speechToText.text}</p>
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
            <li className="p-4">{chapter.start}</li>
            <li className="p-4">{chapter.end}</li>
          </ul>);})}
      </div>
  );
}

export default Record;

