import { getQuotesList } from "@/app/lib/data";
import { DeleteQuote } from "@/app/ui/page/DeleteQuote";

export default async function EditPage(){

    const { quotesList, quotesListCount } = await getQuotesList();

    return(
        <div className = "page">            
            <p className = "meta">quotes: { quotesListCount }</p>

            <div className = "quotesList2">
                { quotesList.map( ( quote ) => (
                    <div key = { quote.id } className = "quoteRow">
                        <p className = "meta2">{ quote.title }</p>
                        <p>{ quote.content }</p>
                        <DeleteQuote id = { quote.id }/>
                    </div>
                ))}
            </div>
        </div>
    )
};