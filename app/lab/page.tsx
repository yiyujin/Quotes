import React from 'react';
import { MatterTest } from '../ui/lab/matterjs-test';
import { getQuotesList, getQuotesCount } from '../lib/data';

export default async function MatterPage(){
    const  { quotesList, quotesListCount } = await getQuotesList();

    const { data2 } = await getQuotesCount();

    console.log(data2);

    return (
        <>
            <div className = "">
                {/* <MatterTest quotesListCount = { quotesListCount }/> */}
                <MatterTest quotesListCount = { quotesList }/>
            </div>
        </>
    );
};