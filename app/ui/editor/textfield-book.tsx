'use client'

import { createBook } from '../../lib/action';

export default function TextFieldHome() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const title = formData.get('title')?.toString().trim();
    const author = formData.get('author')?.toString().trim();

    if (!title || !author) {
      alert('Please fill in both title and author fields');
      return;
    }

    await createBook(formData);
    e.target.reset();
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

        <button className = "fullButton" type = "submit">Start typing quotes..</button>
      </div>
    </form>
  );
}
