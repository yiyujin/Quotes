'use client'

import { useState, useEffect } from 'react';
import { getRandomQuote } from "../lib/data";

interface Quote {
  data: string;
}

export default function Player() {
    const [quote, setQuote] = useState<Quote | null>(null);
    const [auto, setAuto] = useState(false);

    const handleAuto = () => {
        setAuto(!auto);
    }

    useEffect(() => {
        fetchNewQuote();
    }, []);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if ( auto ) {
            timeoutId = setTimeout(() => {
                fetchNewQuote();
            }, 2000); //2 sec
        }

        return () => {
            if ( timeoutId ) {
                clearTimeout(timeoutId);
            }
        };
    }, [auto, quote]);

    const fetchNewQuote = async () => {
        try {
            const newQuote = await getRandomQuote();

            if (newQuote) {
                setQuote(newQuote);
            } else {
                setQuote({ data: 'Failed to load quote' });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className = "page">
            <div style = { { display: "flex", flexDirection: "column", height: "100%" } }>
                <div className = "playerQuote">
                    <h1>{ quote?.data }</h1>
                </div>

                <button className = "Button" onClick = { handleAuto }>
                    { auto ? 'Pause' : 'Play'}
                </button>
                <button className = "Button" onClick = { fetchNewQuote }>Random</button>
            </div>
        </div>
    );
}