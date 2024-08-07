import React from 'react';
import { MatterTest } from '../ui/lab/matterjs-test';
import { getQuotesList } from '../lib/data';

export default async function MatterPage(){
    const  { quotesList, quotesListCount } = await getQuotesList();

    return (
        <>
            <div className = "">
                {/* <MatterTest quotesListCount = { quotesListCount }/> */}
                {/* <h1>rowCount: { quotesListCount }</h1> */}
                <MatterTest quotesList = { quotesList }/>
            </div>
        </>
    );
};