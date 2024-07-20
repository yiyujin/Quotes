const { db } = require('@vercel/postgres');
const { users, books, quotes } = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedBooks(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS books (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author VARCHAR(255) NOT NULL
            );
        `;

        console.log(`Created "books" table`);

        const insertedBooks = await Promise.all(
            books.map(
                (book) => client.sql`
                    INSERT INTO books (id, title, author)
                    VALUES (${book.id}, ${book.title}, ${book.author})
                    ON CONFLICT (id) DO NOTHING;
                `
            )
        );

        console.log(`Seeded ${insertedBooks.length} books`);

        return {
            createTable,
            books: insertedBooks,
        };
    } catch (error) {
        console.error('Error seeding books:', error);
        throw error;
    }
  }

async function seedQuotes(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS quotes (
        id INT PRIMARY KEY,
        page_number VARCHAR(255) NOT NULL,
        content VARCHAR(255) NOT NULL
      )
    `;

    console.log(`Created "quotes" table`);

    const insertedQuotes = await Promise.all(
      quotes.map(
        (quote) => client.sql`
          INSERT INTO quotes (id, page_number, content)
          VALUES (${quote.id}, ${quote.page_number}, ${quote.content})
          ON CONFLICT (id) DO NOTHING
        `
      )
    );

    console.log(`Seeded ${insertedQuotes.length} quotes`);

    return {
      createTable,
      quotes: insertedQuotes,
    };
  } catch (error) {
    console.error('Error seeding quotes:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedBooks(client);
  await seedQuotes(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
