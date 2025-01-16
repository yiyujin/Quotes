import { getRandomQuote } from "../lib/data";

export default async function Player(){
    const quote = await getRandomQuote();

    return(
        <div className = "page">
            <div className = "playerQuote">
                <h1>{ quote?.data }</h1>
            </div>
        </div>
    )
};