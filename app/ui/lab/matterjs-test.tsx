'use client';

import { useRef, useEffect, useState } from "react";
import Matter from "matter-js";

// CREATE CANVAS VARIABLES
const r = 10;
const wallWidth = 10;
const width = window.innerWidth - 260 - 32;
const height = window.innerHeight - wallWidth / 2;
const colors = ['#1B1B1B', '#AF50FF', '#00BEFF', '#FF685F', '#F7C839','#FF3E0D', '#FD9540', '#00D37E'];
// const colors = ['#FF0000', '#00FF00', '#0000FF', '#000000'];

let index = 0;
let colorIndex = 4;

export function MatterTest( { quotesList} : { quotesList : object } ) {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        let Engine = Matter.Engine;
        let Render = Matter.Render;
        let World = Matter.World;
        let Bodies = Matter.Bodies;
        let Runner = Matter.Runner;

        // CREATE AN ENGINE
        let engine = Engine.create();

        engine.gravity.x = 0;
        engine.gravity.y = 1;

        // CREATE AND RUN A RENDER
        let render = Render.create({
            engine,
            canvas: canvasRef.current,
            options: {
                width: width,
                height: height,
                background: "220",
                wireframes: false
            }
        });

        Render.run(render);

        // CREATE WALLS
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

        World.add(engine.world, [ground, leftWall, rightWall]);

        //CREATE BALLS
        for (let i = 0; i < quotesList.length; i++) {

            //ASSIGN COLORS
            let standard = quotesList[index].book_id;
            let current = quotesList[i].book_id;
            
            if (standard !== current) { 
                index = i;
                colorIndex = (colorIndex + 1) % colors.length;
            
                console.log(`
                    standard: ${standard}
                    current: ${current}
                    colorIndex: ${colorIndex}
                `);
            }

            let c = colors[colorIndex];

            let ball = Bodies.circle(width / 2, Math.random() * height, r, {
                friction: 0.01,
                restitution: 0.9,
                render: {
                    fillStyle: c
                },
            });

            World.add(engine.world, ball);
        }

        //CREATE RUNNER AND RUN THE ENGINE
        let runner = Runner.create();
        Runner.run(runner, engine);
    }, []);

    return (
        <>
            <canvas ref = { canvasRef } />
        </>
    );
}
