//API - POST

'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema1 = z.object({
  title : z.string(),
  author : z.string(),
});

export async function createBook( formData: FormData ){
  const { title, author } = FormSchema1.parse({
    title : formData.get('title'),
    author: formData.get('author'),
  });

  const result = await sql`
    INSERT INTO books (title, author, created_date)
    VALUES (
      ${title},
      ${author},
      NOW()
    )
    RETURNING id
  `;

  const bookId = result.rows[0].id;

  revalidatePath(`/books/${bookId}`); //window.location = "/";
  redirect(`/books/${bookId}`);
}

const FormSchema = z.object({
  content: z.string(),
  book_id: z.string(),
});

export async function createQuote( formData: FormData ) {
  const { content, book_id } = FormSchema.parse({
    content: formData.get('content'),
    book_id: formData.get('book_id'),
  });

  const page_number = 0;
  const deleted = 'N';

  await sql`
    INSERT INTO quotes (book_id, page_number, content, deleted, created_date)
    VALUES (
      ${book_id},
      ${page_number},
      ${content},
      ${deleted},
      NOW()
    )
    RETURNING id
  `;

  revalidatePath(`/books/${ book_id }`);
  redirect(`/books/${ book_id }`);
}

export async function deleteQuote(formData: FormData) {
  const id = Number(formData.get('id'));

  await sql`
    UPDATE quotes
    SET deleted = 'Y'
    WHERE id = ${id};
  `;

}