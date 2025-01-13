'use cilent'

import { getQuotesList, getBooksList } from "../lib/data"

export default async function ListPage(){

    const { quotesList, quotesListCount } = await getQuotesList();
    // const { booksList, booksListCount } = await getBookList();

    return(
        <div className = "page">            
            <p className = "meta">quotes: { quotesListCount }</p>

            <div className = "quotesList2">
            { quotesList.map(( quote ) => (
                <div key = { quote.id } className = "quoteRow">
                    <p className = "meta2">{ quote.title }</p>
                    <p>{ quote.content }</p>
                    
                    {/* <form action = { deleteQuote } method = "DELETE">
                        <input type = "hidden" name = "id" value = { quote.id } />
                        <button type = "submit" className = "text-xs rounded-md border p-2 hover:bg-gray-100">DELETE</button>
                    </form> */}
                </div>
            ))}
            </div>
        
        </div>
    )
};