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

const UPLOAD = false;

function APITest() {
    
    const assembly = axios.create({
        baseURL: "https://api.assemblyai.com/v2",
        headers: {
            authorization: "0daee8a3236348678195040d20b89b83",
            "content-type": "application/json",
        },
    });
    if (UPLOAD) {
        assembly
            .post("/transcript", {
                audio_url: "https://bit.ly/3yxKEIY"
            })
            .then((res) => {
                console.log(res.data.id);
                var recordClass = "APMA1650";
                var dateObj = new Date();
                const defaultTitle = recordClass+" "+
                    (dateObj.getMonth()+1)+'/'+dateObj.getDate()+'/'+dateObj.getFullYear()
                    + ":" + dateObj.getHours()+":"+dateObj.getMinutes();
                const docData = {
                    "university": "Brown",
                    "class": "APMA1650",
                    "title": defaultTitle,
                    "id": res.data.id,
                    "date": Timestamp.now()
                };
                addDoc(collection(db, "lectures"), docData);
            })
            .catch((err) => console.error(err));
    } else {
        const fetchData = {
            "university": "Brown",
            "class": "APMA1650",
            "title": "APMA1650 10/15/2022:11:55"
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
                assembly
                    .get("/transcript/"+transcriptId)
                    .then((res) => console.log(res.data.text))
                    .catch((err) => console.error(err));
            }
        })
    })
    }

  return (
    <>
        <h1>API Test</h1>


    </>
  );
}

export default APITest;
