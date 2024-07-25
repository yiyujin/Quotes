import { getQuotesList, getBooksList } from "../lib/data"

export default async function List(){

    const { quotesList, quotesListCount } = await getQuotesList();
    // const { booksList, booksListCount } = await getBookList();


    return(
        <>
            <div className = "flex flex-col h-full w-full">

                <h1>Quotes List</h1>

                <div className = "">
                    <h1>rowCount: { quotesListCount }</h1>
                </div>

                <div className = "flex h-full overflow-y-auto">
                    <table>
                        <tr>
                            <th>book_id</th>
                            <th>id</th>
                            <th>page_number</th>
                            <th>content</th>
                        </tr>
                        
                        { quotesList.map(( quote ) => (
                            <tr key = { quote.id } className = "">
                                <td>{ quote.book_id }</td>
                                <td>{ quote.id }</td>
                                <td>{ quote.page_number }</td>
                                <td>{ quote.content }</td>
                                
                                {/* <form action = { deleteQuote } method = "DELETE">
                                    <input type = "hidden" name = "id" value = { quote.id } />
                                    <button type = "submit" className = "text-xs rounded-md border p-2 hover:bg-gray-100">DELETE</button>
                                </form> */}
                            </tr>
                        ))}
                    </table>
                </div>
            
            </div>

        </>
    )
};