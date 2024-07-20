'use client'

import { createBook } from '../../lib/action';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

export default function TextFieldHome() {
  const handleSubmit = async ( event ) => {
    event.preventDefault();

    const formData = new FormData( event.target );
    await createBook( formData );

    event.target.reset();
  };

  return (
    <form action = { createBook } onSubmit = { handleSubmit } method="POST" className="w-full p-4 rounded-[24px] bg-slate-100">
      <div className = "flex items-center">
        <label htmlFor = "title" className = "sr-only">Content</label>
        <textarea
          id = "title"
          name = "title"
          className = "flex-1 p-4 resize-none bg-transparent"
          placeholder = "Start typing a book.."
        ></textarea>
        <button
          type = "submit" // Use type="submit" to trigger form submission
          className = "flex h-8 w-8 hover:opacity-40 items-center justify-center rounded-full bg-black text-white"
        >
          <ArrowUpIcon className="w-6" />
        </button>
      </div>
    </form>
  );
}
