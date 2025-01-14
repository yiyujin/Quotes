import { getQuotesList } from "@/app/lib/data";

export default async function ListPage(){
    const { quotesList, quotesListCount } = await getQuotesList();

    return(
        <div className = "page">            
            <p className = "meta">quotes: { quotesListCount }</p>

            <div className = "quotesList2">
                { quotesList.map( ( quote ) => (
                    <div key = { quote.id } className = "quoteRow">
                        <p className = "meta2">{ quote.title }</p>
                        <p>{ quote.content }</p>
                    </div>
                ))}
            </div>
        </div>
    )
};