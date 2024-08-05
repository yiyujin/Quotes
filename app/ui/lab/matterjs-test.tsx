'use client';

import { useRef, useEffect, useState } from "react";
import Matter from "matter-js";

// CREATE CANVAS VARIABLES
const r = 10;
const wallWidth = 10;
const width = window.innerWidth - 260 - 32;
const height = window.innerHeight - wallWidth / 2;
const colors = ['#AF50FF', '#00BEFF', '#FF685F', '#F7C839','#FF3E0D', '#FD9540', '#00D37E'];
let c;

let balls = [];

export function MatterTest( { quotesList} : { quotesList : object}) {
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
                fillStyle: 'rgba(0, 0, 0, 1)',
            }
        });

        const leftWall = Bodies.rectangle(0, height / 2, wallWidth, height, {
            isStatic: true,
            render: {
                fillStyle: 'rgba(0, 0, 0, 1)',
            }
        });

        const rightWall = Bodies.rectangle(width, height / 2, wallWidth, height, {
            isStatic: true,
            render: {
                fillStyle: 'rgba(0, 0, 0, 1)',
            }
        });

        // ADD WALLS TO THE WORLD
        World.add(engine.world, [ground, leftWall, rightWall]);

        // ADD BALLS TO THE WORLD BASED ON quoteCount
        // for (let i = 0; i < quotesListCount.length; i++) {

        //     //ASSIGN COLORS BY COUNT GROUP BY BOOK_ID

        //     if(i <= 50){
        //         c = colors[0];
        //     } else {
        //         c = colors[1];
        //     }

        //     const ball = Bodies.circle(Math.random() * width, Math.random() * height, r, {
        //         restitution: 0.9,
        //         render: {
        //             fillStyle: c,
        //         },
        //     });
        //     World.add(engine.world, ball);
        // }

        // { quotesList.map(( quote ) => (

        //     let ball = Bodies.circle(Math.random() * width, Math.random() * height, r, {
        //         restitution: 0.9,
        //         render: {
        //             fillStyle: c,
        //         },
        //     });

        //     balls.push()

        //     <tr key = { quote.id } className = "">
        //         <td>{ quote.book_id }</td>
        //         <td>{ quote.id }</td>
        //         <td>{ quote.page_number }</td>
        //         <td>{ quote.content }</td>
        //     </tr>
        // ))}

        
        // RUN THE ENGINE AND RENDER/CANVAS
        Runner.run(runner, engine);
        Render.run(render);

    }, []);

    return (
        <>
            <canvas ref = { canvasRef } />
        </>
    );
}
