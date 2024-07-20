'use client'
import { createQuote } from '../../lib/action';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function TextFieldQuote({ bookId }) {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('bookId', bookId);
    createQuote(formData);
    event.target.reset();
    router.refresh(); // This will cause the page to refresh and show the new quote
  };

  const placeholderText = `Start typing quotes for.. ${bookId}`;

  return (
    <form action={createQuote} onSubmit={handleSubmit} className="w-full p-4 rounded-[24px] bg-slate-100">
      <div className="flex items-center gap-2">
        <label htmlFor="content" className="sr-only">Content</label>
        <textarea id="content" name="content" className="flex-1 p-4 resize-none bg-transparent" placeholder={placeholderText}></textarea>
        <button type="submit" className="flex h-8 w-8 hover:opacity-40 items-center justify-center rounded-full bg-black text-white">
          <ArrowUpIcon className="w-6" />
        </button>
      </div>
    </form>
  );
}