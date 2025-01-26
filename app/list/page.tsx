import { getQuotesList } from "@/app/lib/data";
import Link from "next/link";
import { auth } from "@/auth";

export default async function ListPage(){
    const session = await auth();
    const { quotesList, quotesListCount } = await getQuotesList( session );

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