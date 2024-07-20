'use client'

import { createQuote } from '../../lib/action';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

export default function TextFieldQuote( { bookId } ) {
  
  const handleSubmit = async ( event ) => {
    event.preventDefault();

    const formData = new FormData( event.target );

    await createQuote( formData );

    event.target.reset();
  };

  const placeholderText = `Start typing quotes for.. ${bookId}`;

  return (
    <form action = { createQuote } onSubmit = { handleSubmit } method = "POST" className = "w-full p-4 rounded-[24px] bg-slate-100">
      
      <div>
        <div className = "flex items-center gap-2">
          <label htmlFor = "content" className="sr-only">Content</label>
          <textarea
            id = "content"
            name = "content"
            className = "flex-1 p-4 resize-none bg-transparent"
            placeholder = { placeholderText }
          ></textarea>        

          <button type = "submit" className = "flex h-8 w-8 hover:opacity-40 items-center justify-center rounded-full bg-black text-white">
            <ArrowUpIcon className = "w-6" />
          </button>
        </div>

        <div className = "hidden flex items-center gap-2">
          <label htmlFor = "book_id" className="sr-only">Content</label>
          <textarea
            id = "book_id"
            name = "book_id"
            className = "flex-1 p-4 resize-none bg-transparent"
            value = { bookId }
          ></textarea>        
        </div>
      </div>

    </form>
  );
}