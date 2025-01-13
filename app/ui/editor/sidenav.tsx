import NavLink from './nav-link';
import { getBooks } from '../../lib/data';

export default async function SideNav() {
  const books = await getBooks();

  return (
      <div className = "sidenav">
      
        <NavLink href = "/" title = "Quotes"/>

        <NavLink href = "/list" title = "List"/>

        <NavLink href = "/lab" title = "Lab"/>

        <NavLink href = "/player" title = "Player"/>

        <p className = "navDivider">Books ({ books.length })</p>

        { books.map( ( book ) => (
          <NavLink
            key = { book.id }
            href = { `/books/${book.id}` }
            title = { book.title }
          />
        ))}
    </div>
  );
}