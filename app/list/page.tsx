import { getQuotesList, getBooksList } from "../lib/data"
import QuotesList from "../ui/page/QuotesList";

export default async function ListPage(){

    const { quotesList, quotesListCount } = await getQuotesList();
    // const { booksList, booksListCount } = await getBookList();

    return(
        <div className = "page">            
            <p className = "meta">quotes: { quotesListCount }</p>
            
            <QuotesList quotesList = { quotesList } quotesListCount = { quotesListCount } />        
        </div>
    )
};