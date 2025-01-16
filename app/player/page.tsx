'use client'

import { useState, useEffect } from 'react';
import { getRandomQuote } from "../lib/data";

interface Quote {
  data: string;
}

export default function Player() {
    const [quote, setQuote] = useState<Quote | null>(null);

    useEffect(() => {
        fetchNewQuote();
    }, []);

    const fetchNewQuote = async () => {
        try {
            const newQuote = await getRandomQuote();
            // Handle the case where newQuote might be undefined
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
            <div style = { { display : "flex", flexDirection : "column", height : "100%" } }>
                <div className = "playerQuote">
                    <h1>{ quote?.data }</h1>
                </div>

                <button className = "Button" onClick = { fetchNewQuote }>Random</button>
            </div>
        </div>
    );
}