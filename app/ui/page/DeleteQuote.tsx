import { deleteQuote } from '@/app/lib/action';
 
export function DeleteQuote({ id }: { id: string }) {
  const deleteQuoteWithId = deleteQuote.bind(null, id);
 
  return (
    <form action = { deleteQuoteWithId }>
      <button className = "Button" type = "submit">delete</button>
    </form>
  );
}