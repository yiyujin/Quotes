'use client'

import { createBook } from '../../lib/action';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import { FormEvent } from 'react';

export default function TextFieldHome() {
  const handleSubmit = async ( event: FormEvent<HTMLFormElement> ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    await createBook(formData);

    // Null check before calling reset
    const formElement = event.currentTarget as HTMLFormElement;
    if (formElement) {
      formElement.reset();
    }
  };

  return (
    <form action = { createBook } onSubmit = { handleSubmit } className="w-full p-4 rounded-[24px] bg-slate-100">
      <div className = "flex items-center">
        <label htmlFor = "title" className = "sr-only">Content</label>
        <textarea
          id = "title"
          name = "title"
          className = "flex-1 p-4 resize-none bg-transparent"
          placeholder = "Title"
        ></textarea>

        <textarea
          id = "author"
          name = "author"
          className = "flex-1 p-4 resize-none bg-transparent"
          placeholder = "Author"
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
