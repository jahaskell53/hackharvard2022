import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import DropDown from "./DropDown";
import RecordButton from "./RecordButton";
import HomeButton from "./HomeButton";
import EndButton from "./EndButton";
import PauseButton from "./PauseButton";
import useRecorder from "./AudioHelper";
import { useParams } from "react-router-dom";
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
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState("stopped");
  const [recorder, setRecorder] = useState<MediaRecorder|null>(null);

  const { lectureId } = useParams();
  const [time, setTime] = useState(0);  
  const id = lectureId?.split("lecture-")[1];
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
                        .then((res) => console.log(res.data))
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
    // setTime(0);

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
      <h1 className="text-4xl my-8">Lecture {id} Recording</h1>
      <div className="flex flex-row gap-5 justify-center">
    {((isRecording == "started") || (isRecording == "paused") || (isRecording == "resumed") ) ? <PauseButton isRecording={isRecording} pauseRecording={pauseRecording} resumeRecording={resumeRecording} setIsRecording={setIsRecording}></PauseButton> : <RecordButton isRecording={isRecording} startRecording={startRecording}/>}
          {(isRecording == "started" || isRecording == "paused" || isRecording == "resumed") && <EndButton stopRecording={stopRecording}/>}
          </div>
          <p className="mt-6 text-2xl mb-6">{Math.floor(Math.floor(time / 1000)/60) < 10 && 0}{Math.floor(Math.floor(time / 1000)/60)}:{Math.floor(time / 1000) % 60 <10 && 0}{Math.floor(time / 1000) % 60}</p>
          <p className="text-left">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam dicta alias reiciendis rerum? Esse minus, laboriosam repellendus deleniti, inventore consectetur minima pariatur saepe dolores tempore recusandae soluta odit cumque debitis adipisci, nobis quae unde illum tempora sunt! Molestias ad esse provident modi assumenda voluptate totam quibusdam commodi. Iste amet tempora repellat error mollitia quibusdam, enim expedita assumenda ipsa. Vel nobis minima non asperiores cum saepe quasi facilis, tempore itaque nulla sequi sed quam officiis blanditiis eos voluptate, obcaecati neque pariatur deleniti rem consequuntur. Commodi nisi voluptatibus, soluta, consequuntur facilis reiciendis repellendus neque in explicabo accusamus eveniet sequi, quod voluptate! Aspernatur.</p>
      </div>
  );
}

export default Record;

