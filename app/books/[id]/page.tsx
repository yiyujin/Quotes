import { getQuotes } from '../../lib/data';
import { deleteQuote } from '../../lib/action';
import TextFieldQuote from '../../ui/editor/textfield-quote';

export default async function BookItemPage( { params : { id } } : { params : { id : string} }){

    const { data, count } = await getQuotes( id );
    
    return(
        <>
            <div className = "flex flex-col h-full w-full">

                <div className = "">
                    <h1>book_id: { id } </h1>
                    <h1>rowCount: { count }</h1>
                </div>

                <div className = "flex flex-col-reverse h-1/2 overflow-y-auto">
                        {data.map(( quote ) => (
                            <div key = { quote.id } className = "flex gap-4 snap-center">
                                <p>{ quote.id }</p>
                                <p>{ quote.page_number }</p>
                                <p>{ quote.content }</p>
                                
                                <form action = { deleteQuote }>
                                    <input type = "hidden" name = "id" value = { quote.id } />
                                    <button type = "submit" className = "text-xs rounded-md border p-2 hover:bg-gray-100">DELETE</button>
                                </form>
                            </div>
                        ))}
                </div>

                <div className="">
                    <TextFieldQuote bookId = { id }/>
                </div>
                
            </div>
        </>
    );
}