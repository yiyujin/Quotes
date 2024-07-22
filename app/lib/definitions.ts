export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };

export type Book = {
    id: string;
    title: string;
    author: string;
};

export type Quote = {
    id: number;
    page_number: number;
    content: string;
    deleted: string;
    book_id: string;
    created_time: string;
};