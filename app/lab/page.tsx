import React from 'react';
import { MatterTest } from '../ui/lab/matterjs-test';
import { getQuotesList, getQuotesCount } from '../lib/data';

export default async function MatterPage(){
    const  { quotesList } = await getQuotesList();

    return (
        <>
            <div className = "">
                {/* <MatterTest quotesListCount = { quotesListCount }/> */}
                <MatterTest quotesList = { quotesList }/>
            </div>
        </>
    );
};