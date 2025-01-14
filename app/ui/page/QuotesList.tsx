'use client';

export default function QuotesList( { quotesList, quotesListCount }){
  const handleDelete = async (id: any) => {
      console.log("Deleting quote with ID:", id);
  };

  return (
    <div className="quotesList2">
        {quotesList.map( ( quote ) => (
            <div key={quote.id} className="quoteRow">
                <p className="meta2">{quote.title}</p>
                <p>{quote.content}</p>

                <button onClick = { () => handleDelete(quote.id) }>delete</button>
            </div>
        ))}
    </div>
  );
};