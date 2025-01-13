'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function NavLink({ href, title }) {
  const pathname = usePathname();
  const status = pathname === href ? 'selected' : 'unselected';

  return (
    <Link 
      href={{
        pathname: href,
        query: { bookTitle: title }
      }} 
      className={clsx(
        "navLink",
        {
          'selected': status === 'selected',
          'unselected': status === 'unselected',
        }
      )}
    >
      <p className="flex-1 overflow-y-hidden overflow-x-auto whitespace-nowrap text-ellipsis items-center flex">
        {title}
      </p>
    </Link>
  );
}