# Music Visualizer — Real-Time Pitch-Reactive Canvas Art

A Next.js/React application that listens to live microphone input, detects the musical pitch being played or sung in real time, and renders animated generative flower graphics on a canvas — each flower's position and appearance driven by the detected note.

Built for Exercise 4 in my graduate Web Programming course at Rutgers University, taught by Professor Anselm Spoerri. [Full assignment details](https://aspoerri.comminfo.rutgers.edu/Teaching/WebProg/Exercises.html#Ex4).

## How It Works

1. The app requests microphone access via the Web Audio API
2. Live audio is streamed into a pitch-detection model to identify the musical note being played (C, C#, D, ... B)
3. Each detected note is mapped to a horizontal position along a chromatic scale
4. A p5.js sketch renders an animated flower at that position, which fades and shrinks over time, creating a continuously evolving generative visualization synced to sound

## My Contributions

- Built the full React/Next.js application structure (`page.js`, `notes.js`)
- Wrote all pitch-to-visual mapping logic, translating detected musical notes into canvas coordinates
- Designed and implemented the p5.js generative flower rendering system (`canvas.js`), including the procedural petal geometry, color, and fade/decay animation over time
- Integrated the Web Audio API microphone stream with React state and lifecycle hooks (`useState`, `useEffect`, `useRef`)
- Managed real-time state updates for multiple simultaneous animated elements with opacity/size decay

## Credit

The pitch-detection utility (`utils/pitchDetection.js`) was provided as course starter code by Professor Anselm Spoerri for Rutgers Web Programming (course 559) and is used here with attribution. All other code — the React components, canvas rendering, animation logic, and note-to-visual mapping — is my own work.

## Tech Stack

- Next.js / React (hooks: `useState`, `useEffect`, `useRef`)
- p5.js (canvas rendering and animation)
- Web Audio API (real-time microphone input and pitch detection)

## Project Structure

```
├── page.js                        Entry point, renders the Notes component
├── notes.js                       Core logic: audio setup, pitch detection, state management
├── canvas.js                      p5.js sketch: renders animated flowers per detected note
├── utils/pitchDetection.js  Provided course utility (see Credit above)
```

## Course Context

Built for a graduate-level Web Programming course, Rutgers School of Communication and Information, under Professor Anselm Spoerri. I'll be working with Professor Spoerri again in my upcoming capstone course and plan to confirm with him directly on any additional public-sharing considerations for course materials.
