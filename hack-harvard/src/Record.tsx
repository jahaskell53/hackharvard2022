import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import DropDown from "./DropDown";
import RecordButton from "./RecordButton";
import HomeButton from "./HomeButton";
import EndButton from "./EndButton";
import PauseButton from "./PauseButton";
import useRecorder from "./AudioHelper";

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}

function Record() {
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState("stopped");
  const [recorder, setRecorder] = useState<MediaRecorder|null>(null);
  
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
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording("started");
  };

  const stopRecording = () => {
    setIsRecording("stopped");
  };
  
  const pauseRecording = () => {
    setIsRecording("paused");
  }

  const resumeRecording = () => {
    setIsRecording("resumed");
  }

  return (
    <div className="w-screen p-10">
      <h1 className="text-4xl my-8">Recording</h1>
      <div className="flex flex-row gap-5 justify-center">
    {((isRecording == "started") || (isRecording == "paused") || (isRecording == "resumed") ) ? <PauseButton isRecording={isRecording} pauseRecording={pauseRecording} resumeRecording={resumeRecording} setIsRecording={setIsRecording}></PauseButton> : <RecordButton isRecording={isRecording} startRecording={startRecording}/>}
          {(isRecording == "started" || isRecording == "paused" || isRecording == "resumed") && <EndButton stopRecording={stopRecording}/>}
          </div>
          <p className="text-left mt-10">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam dicta alias reiciendis rerum? Esse minus, laboriosam repellendus deleniti, inventore consectetur minima pariatur saepe dolores tempore recusandae soluta odit cumque debitis adipisci, nobis quae unde illum tempora sunt! Molestias ad esse provident modi assumenda voluptate totam quibusdam commodi. Iste amet tempora repellat error mollitia quibusdam, enim expedita assumenda ipsa. Vel nobis minima non asperiores cum saepe quasi facilis, tempore itaque nulla sequi sed quam officiis blanditiis eos voluptate, obcaecati neque pariatur deleniti rem consequuntur. Commodi nisi voluptatibus, soluta, consequuntur facilis reiciendis repellendus neque in explicabo accusamus eveniet sequi, quod voluptate! Aspernatur.</p>
      </div>
  );
}

export default Record;

