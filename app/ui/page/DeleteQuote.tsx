import { deleteQuote } from '@/app/lib/actions';
 
export function DeleteQuote({ id }: { id: string }) {
  const deleteQuoteWithId = deleteQuote.bind(null, id);
 
  return (
    <form action = { deleteQuoteWithId }>
      <button className = "Button" type = "submit">delete</button>
    </form>
  );
}