'use client';

import { useEffect, useRef } from "react";
import Matter from "matter-js";

export function MatterTest(){
    const containerRef = useRef();
    const canvasRef = useRef();

    useEffect(() => {
        let Engine = Matter.Engine;
        let Render = Matter.Render;
        let World = Matter.World;
        let Bodies = Matter.Bodies;
        let Runner = Matter.Runner;
    
        //CREATE AN ENGINE
        let engine = Engine.create();
        let runner = Runner.create();

        engine.gravity.x = 0;
	    engine.gravity.y = 1;

        const width = 400;
        const height = 400;

        //CREATE A RENDER
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

        //CREATE COMPONENTS
        const ground = Bodies.rectangle(width/2, height, width, 40, {
            isStatic: true,
            render: {
                fillStyle: 'blue',
                strokeStyle: 'red',
                lineWidth: 10,
            }
        });

        const ball = Bodies.circle(width/2, height/2, 10, {
            restitution: 0.9,
            render: {
              fillStyle: 'red',
            },
        });

        //ADD GROUND TO THE WORLD
        World.add(engine.world, [ ground, ball]);

        //RUN THE ENGINE AND REDNER/CANVAS
        Runner.run(runner, engine);
        Render.run(render);

    }, []);

    return (
        // <div
        //     ref = { containerRef }
        //     style={{
        //         width: 600,
        //         height: 600,
        //     }}
        // >
            <canvas ref = { canvasRef} />
        // </div>
    );
};