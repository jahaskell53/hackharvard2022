import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios"
import { initializeApp } from "firebase/app";
import { getDocs, getFirestore } from "firebase/firestore";
import { collection, addDoc, query, where, Timestamp } from "firebase/firestore";

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
        "content-type": "application/json",
    },
});

const UPLOAD = false;

function recordAudio() {
    navigator.mediaDevices.getUserMedia({audio: true})
    .then(stream => {
        const recorder = new MediaRecorder(stream);
        recorder.start();
        let audioChunks = [];
        recorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
        });

        setTimeout(() => {
            recorder.stop();
            console.log("Stopped recording");
        }, 10000);

        setTimeout(() => {
            const audioBlob = new Blob(audioChunks, {type: 'audio/m4a'});
            console.log(audioBlob);
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
            uploadAudio(audioBlob);
        }, 10100);
    })
}

function uploadAudio(blob) {

    const recordClass = "APMA1650";
    console.log(blob);

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
        })
    )
}

function playAudio() {

    const fetchData = {
        "university": "Brown",
        "class": "APMA1650",
        "title": "APMA1650 10/15/2022 15:18"
    };
    const q = query(collection(db, "lectures"),
        where("university", "==", fetchData.university),
        where("class", "==", fetchData.class),
        where("title", "==", fetchData.title));
    var foundLectures = 0;
    getDocs(q).then((foundDocs) => {
    foundDocs.forEach((doc) => {
        foundLectures++;
        if (foundLectures == 1) {
            const transcriptId = doc.data().id;
            //const transcriptId = "rkfaoq5a8w-cbca-4c57-b98e-f30e5f076bb0";
            assembly
                .get("/transcript/"+transcriptId)
                .then((res) => console.log(res.data))
                .catch((err) => console.error(err));
        }
    })
    });
}

function APITest() {
    
    if (UPLOAD) {
        recordAudio();
    } else {
        playAudio();
    }

  return (
    <>
        <h1>API Test</h1>


    </>
  );
}

export default APITest;
