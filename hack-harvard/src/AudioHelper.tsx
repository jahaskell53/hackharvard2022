import { useEffect, useState } from "react";

export const useRecorder = () => {
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState("stopped");
  const [recorder, setRecorder] = useState<MediaRecorder|null>(null);

  async function requestRecorder() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return new MediaRecorder(stream);
  }
  
  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
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
    } else {
        recorder.stop()
    }

    // Obtain the audio when ready.
    const handleData = (e) => {
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

  return [audioURL, isRecording, startRecording, pauseRecording, stopRecording];
};

export default useRecorder;
