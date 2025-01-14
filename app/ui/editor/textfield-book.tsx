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
    <form action = { createBook } onSubmit = { handleSubmit }>
      <div className = "textFieldBookContainer">
        <textarea
          id = "title"
          name = "title"
          className = "textFieldBook"
          placeholder = "Title"
        ></textarea>

        <textarea
          id = "author"
          name = "author"
          className = "textFieldBook"
          placeholder = "Author"
        ></textarea>

        <button className = "fullButton" type = "submit">start quotes</button>
      </div>
    </form>
  );
}
