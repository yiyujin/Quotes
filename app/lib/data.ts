//API - GET

'use server'

import { sql } from '@vercel/postgres';
import { User, Book, Quote } from './definitions';

export async function getUser( email: string ) {
  try {
    const user = await sql<User>`
      SELECT * FROM users
      WHERE email = ${ email };
    `;

    return user.rows[0] as User;

  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getQuotes( book_id : string, session : Session ) {
  try {
    const quotes = await sql<Quote>`
      SELECT * FROM quotes
      WHERE book_id = ${ book_id } AND user_id = ${ session?.user.email }
      ORDER BY created_date DESC;
    `;

    const data = quotes.rows;
    const count = quotes.rowCount;

    return { data, count };
  } catch (error) {
    console.error('Failed to fetch quotes:', error);
  }
}

export async function getBooks( session : Session ) {
  try {
    const books = await sql<Book>`
      SELECT * FROM books
      WHERE user_id = ${ session?.user.email }
      ORDER BY created_date DESC;
    `;

    const data = books.rows;
    
    return data;
  } catch (error) {
      console.error('Failed to fetch quotes:', error);
      throw new Error('Failed to fetch quotes.');
  }
}

export async function getQuotesList( session : Session ) {

  try {
      const quotes = await sql`
          SELECT quotes.*, books.title
          FROM quotes
          LEFT JOIN books ON quotes.book_id = books.id
          WHERE quotes.user_id = ${ session?.user.email }
          ORDER BY created_date DESC;
      `;

      const quotesList = quotes.rows;
      const quotesListCount = quotes.rowCount;

      return { quotesList, quotesListCount };
  } catch (error) {
      console.error('Failed to fetch quotes:', error);
      throw new Error('Failed to fetch quotes.');
  }

}

export async function getBooksList() {
  try {
    const books = await sql<Book>`
      SELECT * FROM books
      ORDER BY created_date DESC;
    `;

    const booksList = books.rows;
    const booksListCount = books.rowCount;
    
    return { booksList, booksListCount };
  } catch (error) {
      console.error('Failed to fetch quotes:', error);
      throw new Error('Failed to fetch quotes.');
  }
}

export async function getQuotesCount() {
  try {
      const quotes = await sql<Quote>`
        SELECT COUNT(*) AS count, book_id
        FROM quotes GROUP BY book_id ORDER BY count DESC;
      `;

      const data = quotes.rows;

      return { data };
  } catch (error) {
      console.error('Failed to fetch count', error);
  }
}

export async function getRandomQuote(){
  try {
    const quote = await sql<Quote>`
      SELECT content FROM quotes
      ORDER BY RANDOM()
      LIMIT 1;
    `;

    const data = quote.rows[0].content;

    return{ data };
  } catch (error) {
    console.error('Failed to fetch random quote', error);
  }
}