import { getQuotes } from '../../lib/data';
import { deleteQuote } from '../../lib/action';
import TextFieldQuote from '../../ui/editor/textfield-quote';

export default async function BookItemPage( { params : { id } } : { params : { id : string } }){

    const { data, count } = await getQuotes( id );
    
    return(
        <div className = "page">
            <div className = "quotesTop">
                <div className = "">
                    <p className = "meta">quotes: { count }</p>
                </div>

                <div className = "quotesList">
                    { data.map(( quote ) => (
                        <div key = { quote.id } className = "flex gap-4 snap-center">
                            <p>{ quote.id }</p>
                            <p>{ quote.page_number }</p>
                            <p>{ quote.content }</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className = "textfieldQuoteContainer">
                <TextFieldQuote bookId = { id }/>   
            </div>
        </div> 
    );
}