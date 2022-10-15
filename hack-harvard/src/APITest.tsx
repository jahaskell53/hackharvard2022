import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios"

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
            .then((res) => console.log(res.data.id))
            .catch((err) => console.error(err));
    } else {
        assembly
            .get("/transcript/rkflgmjp0f-bb9a-4a95-a9f8-eba8d1f0b4b0")
            .then((res) => console.log(res.data.text))
            .catch((err) => console.error(err));
    }

  return (
    <>
        <h1>API Test</h1>


    </>
  );
}

export default APITest;
