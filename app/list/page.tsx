import { getQuotesList } from "@/app/lib/data";
import Link from "next/link";

export default async function ListPage(){
    const { quotesList, quotesListCount } = await getQuotesList();

    return(
        <div className = "page">
            <div style = { { display : "flex", justifyContent : "space-between"} }>
                <p className = "meta">quotes: { quotesListCount }</p>
                <Link href = "/list/edit"><button className = "Button">edit</button></Link>
            </div>

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