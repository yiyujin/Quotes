'use server';

//AUTHENTICATION
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { auth } from '@/auth';

const session = await auth();

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

import { signOut } from '@/auth';

export async function handleSignOut() {
  await signOut({ redirectTo: '/' });
}

//API - POST
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

//CREATE USER
const FromSchemaUser = z.object({
  name : z.string(),
  lastname : z.string(),
  email : z.string(),
  password : z.string(),
})

export async function createUser( formData : FormData ){
  const { name, lastname, email, password } = FromSchemaUser.parse({
    name : formData.get('name'),
    lastname : formData.get('lastname'),
    email : formData.get('email'),
    password : formData.get('password'),
  });

  const result = await sql`
  INSERT INTO users (name, lastname, email, password, created_date)
  VALUES(
    ${name},
    ${lastname},
    ${email},
    ${password},
    NOW()
  )
    RETURNING id
  `;

  redirect('/');
}

//CREATE BOOK
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
    INSERT INTO books (user_id, title, author, created_date)
    VALUES (
      ${ session.user.email },
      ${title},
      ${author},
      NOW()
    )
    RETURNING id
  `;

  const bookId = result.rows[0].id;
  
  const bookTitle = formData.get('title');
  revalidatePath(`/books/${bookId}`);
  redirect(`/books/${bookId}?bookTitle=${encodeURIComponent(bookTitle as string)}`);
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


 
export async function deleteQuote( id : string ) {
  await sql`
    DELETE FROM quotes
    WHERE id = ${id}
  `

  revalidatePath('/', 'layout');
}