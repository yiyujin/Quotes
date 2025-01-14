'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function NavLink({ href, title, includeQuery = false }) {
  const pathname = usePathname();
  const status = pathname === href ? 'selected' : 'unselected';

  const linkProps = includeQuery 
  ? { pathname: href, query: { bookTitle: title } }
  : href;

  return (
    <Link 
      href = { linkProps }
      className = { clsx(
        "navLink",
        {
          'selected': status === 'selected',
          'unselected': status === 'unselected',
        }
      )}
    >
      <p className = "flex-1 overflow-y-hidden overflow-x-auto whitespace-nowrap text-ellipsis items-center flex">
        { title }
      </p>
    </Link>
  );
}