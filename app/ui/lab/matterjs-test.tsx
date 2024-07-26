import { useEffect, useRef } from "react";
import Matter from "matter-js";

export function MatterTest(){
    const containerRef = useRef();
    const canvasRef = useRef();

    // const { Engine, Render, Bodies, Runner, World } = Matter;

    useEffect(() => {
        let Engine = Matter.Engine;
        let Render = Matter.Render;
        let World = Matter.World;
        let Bodies = Matter.Bodies;
    
        // Create an engine
        let engine = Engine.create();

        engine.gravity.x = 0;
	    engine.gravity.y = 1;

        // Create a renderer
        let render = Render.create({
            element: containerRef.current,
            engine: engine,
            canvas: canvasRef.current,
            options: {
                width: 400,
                height: 400,
                background: "rgba(255, 0, 255, 0.5)",
                wireframes: false
            }
        });

        // Create a wall
        const wall = Bodies.rectangle(0, 400, 400, 40, {
            isStatic: true,
            render: {
                fillStyle: 'blue',
                strokeStyle: '#000000',
                lineWidth: 3,
            }
        });

        const boxA = Bodies.rectangle(400, 200, 80, 80);
        const boxB = Bodies.rectangle(450, 50, 80, 80);

        // Add the wall to the world
        World.add(engine.world, [wall, boxA, boxB]);

        // Run the engine and renderer
        Engine.run(engine);
        Render.run(render);

    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: 600,
                height: 600,
                background: 'skyblue',
            }}
        >
            <canvas ref={canvasRef} />
        </div>
    );
};