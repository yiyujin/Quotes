'use client'

import { createQuote } from '../../lib/action';
import { useSearchParams, useRouter } from 'next/navigation';

export default function TextFieldQuote( { bookId }: { bookId: string } ) {  
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookTitle = searchParams.get('bookTitle');
  
  const handleSubmit = async ( e : any ) => {
    e.preventDefault();

    const formData = new FormData( e.target );
    await createQuote( formData );

    const currentPath = window.location.pathname;
    router.replace(`${currentPath}?bookTitle=${encodeURIComponent(bookTitle || '')}`);

    e.target.reset();
  };

  const handleKeyDown = (e: any) => {
    if ( e.isComposing || e.keyCode === 229 ) {
      return;
    }
  
    if ( e.key === "Enter" && !e.shiftKey ) {
      const content = e.target.value.trim();
      if ( !content ) {
        e.preventDefault();
        return;
      }
      
      e.preventDefault();
      const form = e.target.closest('form') as HTMLFormElement;
      if ( form ) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    }
  };

  const placeholderText = `Start typing quotes for.. ${bookTitle}`;

  return (
    <div className = "textfieldQuoteContainer">
      <form action = { createQuote } onSubmit = { handleSubmit } method = "POST">  
        <textarea
          id = "content"
          name = "content"
          className = "textfieldQuote"
          placeholder = { placeholderText }
          onKeyDown = { handleKeyDown }
        ></textarea>

        <input type = "hidden" name = "book_id" value = { bookId } />
      </form>
    </div>
  );
}