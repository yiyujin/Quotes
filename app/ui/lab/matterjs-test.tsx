'use client';

import { useRef, useEffect, useState } from "react";
import Matter from "matter-js";
import { getQuotes } from "../../lib/data";

// CREATE CANVAS VARIABLES
const width = 400;
const height = 400;

export function MatterTest() {
    const [quoteCount, setQuoteCount] = useState(0);  // State to store the row count
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const engineRef = useRef(null);
    const worldRef = useRef(null);

    const handleClick = () => {
        if (worldRef.current) {
            // Add a new ball to the world
            const ball = Matter.Bodies.circle(width / 2, height / 2, 10, {
                restitution: 0.9,
                render: {
                    fillStyle: 'red',
                },
            });
            Matter.World.add(worldRef.current, ball);
        }
    };

    useEffect(() => {
        async function fetchQuotes() {
            try {
                const { count } = await getQuotes('4bfee87f-0235-4947-86ed-77535286b66c'); // Provide the actual book_id
                if (typeof count === 'number') {
                    setQuoteCount(count);
                } else {
                    console.error('Invalid count value:', count);
                }
            } catch (error) {
                console.error('Failed to fetch quotes:', error);
            }
        }

        fetchQuotes();
    }, []);

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

        const leftWall = Bodies.rectangle(0, height / 2, 40, height, {
            isStatic: true,
            render: {
                fillStyle: 'blue',
            }
        });

        const rightWall = Bodies.rectangle(width, height / 2, 40, height, {
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

        // ADD COMPONENTS TO THE WORLD
        World.add(engine.world, [ground, leftWall, rightWall, ball]);

        // ADD BALLS TO THE WORLD BASED ON quoteCount
        for (let i = 0; i < quoteCount; i++) {
            const ball = Bodies.circle(Math.random() * width, Math.random() * height, 10, {
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

        // CLEANUP FUNCTION
        return () => {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
            Matter.World.clear(engine.world);
            Matter.Engine.clear(engine);
        };

    }, [quoteCount]); // Dependency array includes quoteCount

    return (
        <div ref={containerRef} style={{ width: 600, height: 600 }}>
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
