'use client';

import { useRef, useEffect, useState } from "react";
import Matter from "matter-js";

// CREATE CANVAS VARIABLES
const width = window.innerWidth - 260 - 32;
const height = window.innerHeight;
const r = 10;
const wallWidth = 10;

export function MatterTest( { quoteCount } : { quoteCount : number } ) {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const engineRef = useRef(null);
    const worldRef = useRef(null);

    useEffect(() => {
        let Engine = Matter.Engine;
        let Render = Matter.Render;
        let World = Matter.World;
        let Bodies = Matter.Bodies;
        let Runner = Matter.Runner;

        // CREATE AN ENGINE
        let engine = Engine.create();
        let runner = Runner.create();

        engine.gravity.x = 0;
        engine.gravity.y = 1;

        // Store engine and world in refs
        engineRef.current = engine;
        worldRef.current = engine.world;

        // CREATE A RENDER
        let render = Render.create({
            element: containerRef.current,
            engine: engine,
            canvas: canvasRef.current,
            options: {
                width: width,
                height: height,
                background: "220",
                wireframes: false
            }
        });

        // CREATE COMPONENTS
        const ground = Bodies.rectangle(width / 2, height, width, wallWidth, {
            isStatic: true,
            render: {
                fillStyle: 'blue',
            }
        });

        const leftWall = Bodies.rectangle(0, height / 2, wallWidth, height, {
            isStatic: true,
            render: {
                fillStyle: 'blue',
            }
        });

        const rightWall = Bodies.rectangle(width, height / 2, wallWidth, height, {
            isStatic: true,
            render: {
                fillStyle: 'blue',
            }
        });

        const ball = Bodies.circle(width / 2, height / 2, r, {
            restitution: 0.9,
            render: {
                fillStyle: 'red',
            },
        });

        // ADD COMPONENTS TO THE WORLD
        World.add(engine.world, [ground, leftWall, rightWall, ball]);

        // ADD BALLS TO THE WORLD BASED ON quoteCount
        for (let i = 0; i < quoteCount; i++) {
            const ball = Bodies.circle(Math.random() * width, Math.random() * height, r, {
                restitution: 0.9,
                render: {
                    fillStyle: 'red',
                },
            });
            World.add(engine.world, ball);
        }

        // RUN THE ENGINE AND RENDER/CANVAS
        Runner.run(runner, engine);
        Render.run(render);

    }, []);

    return (
        <div ref = { containerRef } style = { { width: window.innerWidth - 260 - 32, height: window.innerHeight } }>
            <canvas ref = { canvasRef } />
        </div>
    );
}
