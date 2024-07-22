'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

export default function NavLink( { href, title } ) {
  const pathname = usePathname();
  const status = pathname === href ? 'selected' : 'unselected';

  return (
    <Link href = { href }className = { clsx(
        'flex flex-row h-[48px] pt-4 pb-4 pl-4 pl-0 gap-2 rounded hover:bg-slate-200',
        {
          'bg-transparent': status === 'unselected',
          'bg-slate-400': status === 'selected',
        }
      )}
    >
      
      <p className = "flex-1 overflow-hidden whitespace-nowrap text-ellipsis items-center flex">
        { title }
      </p>
      
      {/* <EllipsisHorizontalIcon className = "w-6" /> */}

    </Link>
  );
}