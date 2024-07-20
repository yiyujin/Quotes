//API - POST

'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema1 = z.object({
  title : z.string(),
  author : z.string().nullable(),
});

export async function createBook( formData: FormData ){
  const { title, author } = FormSchema1.parse({
    title : formData.get('title'),
    author: formData.get('author'),
  });

  const result = await sql`
    INSERT INTO books (title, author, created_date)
    VALUES (${title}, ${author !== undefined ? author : null}, NOW())
    RETURNING id
  `;

  const bookId = result.rows[0].id;

  revalidatePath(`/books/${bookId}`); //window.location = "/";
  redirect(`/books/${bookId}`);
}

const FormSchema = z.object({
  page_number: z.number().nullable(),
  content: z.string(),
  book_id: z.string(),
  deleted: z.string(),
});

const CreateQuote = FormSchema.omit({ page_number: true, deleted: true});

export async function createQuote( formData: FormData ) {
  const { content, book_id } = CreateQuote.parse({
    content: formData.get('content'),
    book_id: formData.get('book_id'),
  });

  console.log('!!!!!!!!!!!!', formData);

  const page_number = 0;
  // const book_id = 'eeec70ca-b8b3-4cd3-af0a-29aa6a7cbd79';
  const deleted = 'N';

  await sql`
    INSERT INTO quotes (book_id, page_number, content, deleted)
    VALUES (
      ${book_id},
      ${page_number},
      ${content},
      ${deleted}
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

  revalidatePath('/');
  redirect('/');
}