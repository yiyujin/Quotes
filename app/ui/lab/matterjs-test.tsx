'use client';

import { useRef, useEffect, useState } from "react";
import Matter from "matter-js";

//CREATE CANVAS VARIABLES
const width = 400;
const height = 400;

export function MatterTest() {
    const containerRef = useRef();
    const canvasRef = useRef();
    const engineRef = useRef();
    const worldRef = useRef();

    const [someStateValue, setSomeStateValue] = useState(false);

    const handleResize = () => {
        setContraints(boxRef.current.getBoundingClientRect());
    };

    const handleClick = () => {
        setSomeStateValue(!someStateValue);

        // Add a new ball to the world
        const ball = Matter.Bodies.circle(width / 2, height / 2, 10, {
            restitution: 0.9,
            render: {
                fillStyle: 'red',
            },
        });

        Matter.World.add(worldRef.current, ball);
    };

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
        const ground = Bodies.rectangle(width / 2, height, width, 40, {
            isStatic: true,
            render: {
                fillStyle: 'blue',
            }
        });

        const leftWall = Bodies.rectangle(0, height/2, 40, height, {
            isStatic: true,
            render: {
                fillStyle: 'blue',
            }
        });


        const rightWall = Bodies.rectangle(width, height/2, 40, height, {
            isStatic: true,
            render: {
                fillStyle: 'blue',
            }
        });

        const ball = Bodies.circle(width / 2, height / 2, 10, {
            restitution: 0.9,
            render: {
                fillStyle: 'red',
            },
        });

        // ADD GROUND TO THE WORLD
        World.add(engine.world, [ground, leftWall, rightWall, ball]);

        // RUN THE ENGINE AND RENDER/CANVAS
        Runner.run(runner, engine);
        Render.run(render);

        // HANDLE INTERACTION
        window.addEventListener('resize', handleResize);

    }, []);

    useEffect(() => {
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: 600,
                height: 600,
            }}
        >
            <canvas ref={canvasRef} />

            <button
                style={{
                    cursor: "pointer",
                    display: "block",
                    textAlign: "center",
                    marginBottom: "16px",
                    width: "100%"
                }}
                onClick={handleClick}
            >
                Press Me!
            </button>
        </div>
    );
}
