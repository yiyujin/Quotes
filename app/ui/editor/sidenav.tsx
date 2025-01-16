import NavLink from './nav-link';
import { getBooks } from '../../lib/data';
import NavStateWrapper from '../page/NavStateWrapper';

export default async function SideNav() {
  const books = await getBooks();

  return (
      <NavStateWrapper>
        <NavLink href = "/" title = "Quotes"/>

        <p className = "navDivider">Functions</p>

        <NavLink href = "/list" title = "List"/>

        <NavLink href = "/lab" title = "Lab"/>

        <NavLink href = "/player" title = "Player"/>

        <p className = "navDivider">Books ({ books.length })</p>

        { books.map( ( book ) => (
          <NavLink
            key = { book.id }
            href = { `/books/${book.id}` }
            title = { book.title }
            includeQuery = { true }
          />
        ))}
    </NavStateWrapper>
  );
}