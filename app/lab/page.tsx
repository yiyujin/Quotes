'use client';

import React from 'react';
import { MatterTest } from '../ui/lab/matterjs-test';

export default function MatterPage(){
    return (
        <>
            <div className = "flex flex-col">
                <h1>Matter.js Test</h1>
                <MatterTest/>
                <div id = "app"></div>
            </div>
        </>
    );
};