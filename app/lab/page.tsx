import React from 'react';
import { MatterTest } from '../ui/lab/matterjs-test';
import { getQuotes } from '../lib/data';

export default function MatterPage(){
    return (
        <>
            <div className = "flex flex-col">
                <h1>Matter.js Test</h1>
                <MatterTest quoteCount={ 20 }/>
                <div id = "app"></div>
            </div>
        </>
    );
};