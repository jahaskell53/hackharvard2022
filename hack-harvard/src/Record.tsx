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
    const handleData = (e) => {
      console.log(e.data);
      setAudioURL(URL.createObjectURL(e.data));
      const audio = new Audio(URL.createObjectURL(e.data));
      audio.play();
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
          <p className="mt-10">0{Math.floor(Math.floor(time / 1000)/60)}:{Math.floor(time / 1000) % 60}</p>
          <p className="text-left">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam dicta alias reiciendis rerum? Esse minus, laboriosam repellendus deleniti, inventore consectetur minima pariatur saepe dolores tempore recusandae soluta odit cumque debitis adipisci, nobis quae unde illum tempora sunt! Molestias ad esse provident modi assumenda voluptate totam quibusdam commodi. Iste amet tempora repellat error mollitia quibusdam, enim expedita assumenda ipsa. Vel nobis minima non asperiores cum saepe quasi facilis, tempore itaque nulla sequi sed quam officiis blanditiis eos voluptate, obcaecati neque pariatur deleniti rem consequuntur. Commodi nisi voluptatibus, soluta, consequuntur facilis reiciendis repellendus neque in explicabo accusamus eveniet sequi, quod voluptate! Aspernatur.</p>
      </div>
  );
}

export default Record;

