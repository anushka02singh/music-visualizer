"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import pitchDetection from "./utils/pitchDetection";

const Canvas = dynamic(() => import("./canvas"), {
    ssr: false
});

const scale = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

let audioContext;
let pitch;
let stream;

export default function Notes() {
    const [detectedNote, setDetectedNote] = useState("C");
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const setup = async () => {
            audioContext = new AudioContext();
            stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            });
            startPitch(stream, audioContext);
        };
        setup();
    }, []);

    useEffect(() => {
        if (detectedNote) {
            const flowerObj = {
                id: Date.now(),
                note: detectedNote,
                opacity: 255,
                size: 80
            };
            setNotes(prevNotes => [...prevNotes, flowerObj]);
        }
    }, [detectedNote]);

    useEffect(() => {
        const interval = setInterval(() => {
            setNotes(prevNotes =>
                prevNotes
                    .map(n => ({ ...n, opacity: n.opacity - 3, size: n.size - 1 }))
                    .filter(n => n.opacity > 0)
            );
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const startPitch = (stream, audioContext) => {
        startAudioContext();
        if (audioContext) {
            pitch = pitchDetection(
                "./model/",
                audioContext,
                stream,
                modelLoaded
            );
        } else {
            console.log("AudioContext or Mic not initialized");
        }
    }

    const modelLoaded = () => {
        getPitch();
    }

    const getPitch = () => {
        pitch.getPitch((err, frequency) => {
            if (frequency) {
                console.log(`frequency ${frequency}`);
                let midiNum = freqToMidi(frequency);
                const note = scale[midiNum % 12];
                console.log(`note ${note}`);
                setDetectedNote(note);
            }
            getPitch();
        })
    }

    return (
        <div>
            <p>Detected Note: {detectedNote}</p>
            <div>
                {notes.map(n => (
                    <span key={n.id} style={{ opacity: n.opacity / 255, margin: "4px" }}>
                        {n.note}
                    </span>
                ))}
            </div>
            <Canvas notes={notes} />
        </div>
    )
}

function startAudioContext() {
    if (audioContext) {
        audioContext.resume();
    } else {
        audioContext = new (window.AudioContext ||
            window.webkitAudioContext ||
            window.mozAudioContext ||
            window.oAudioContext ||
            window.msAudioContext)();
    }
}

function freqToMidi(f) {
    const mathlog2 = Math.log(f / 440) / Math.log(2);
    const m = Math.round(12 * mathlog2) + 69;
    return m;
}
