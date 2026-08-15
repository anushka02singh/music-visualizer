"use client";

import { useRef, useEffect } from "react";
import p5 from "p5";

export default function Canvas({ notes }) {
    let canvasRef = useRef(null);
    const canvasWidth = 800;
    const canvasHeight = 400;

    useEffect(() => {
        const sketch = (p) => {
            p.setup = () => {
                p.createCanvas(canvasWidth, canvasHeight);
                p.clear();
            };
            p.draw = () => {
                p.clear();
                notes.forEach(n => {
                    const xPos = mapNote(n.note);
                    p.fill(255, 255, 255, n.opacity);
                    drawFlower(p, xPos + 75, canvasHeight / 2, n.size, n.opacity);
                });
            };
        };

        const mapNote = (note) => {
            const spacing = canvasWidth / 13;
            const notePositions = {
                C: 0 * spacing,
                "C#": 1 * spacing,
                D: 2 * spacing,
                "D#": 3 * spacing,
                E: 4 * spacing,
                F: 5 * spacing,
                "F#": 6 * spacing,
                G: 7 * spacing,
                "G#": 8 * spacing,
                A: 9 * spacing,
                "A#": 10 * spacing,
                B: 11 * spacing,
            };
            return notePositions[note] || 0;
        }

        const drawFlower = (p, x, y, size, opacity) => {
            const petalCount = 6;
            const petalW = size * 0.45;
            const petalH = size * 1.1;
            const petalOffset = size * 0.55;
            p.push();
            p.translate(x, y);
            for (let i = 0; i < petalCount; i++) {
                const angle = (p.TWO_PI / petalCount) * i;
                p.push();
                p.rotate(angle);
                p.translate(0, -petalOffset);
                p.fill(200, 180, 255, opacity);
                p.ellipse(0, 0, petalW, petalH);
                p.pop();
            }
            p.fill(255, 220, 100, opacity);
            p.ellipse(0, 0, size * 0.5, size * 0.5);
            p.pop();
        }

        const canvas = new p5(sketch, canvasRef.current);
        return () => {
            canvas.remove();
        };
    }, [notes]);

    return (
        <div ref={canvasRef}></div>
    )
}
