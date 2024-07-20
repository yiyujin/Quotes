'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

export default function NavLink( { href, title } ) {
  const pathname = usePathname();
  const status = pathname === href ? 'selected' : 'unselected';

  return (
    <Link href = { href }
      className = { clsx (
          'flex flex-row h-[48px] px-4 items-center justify-start gap-2 rounded hover:bg-slate-200',
          {
            'bg-transparent': status === 'unselected',
            'bg-slate-400': status === 'selected',
          }
      )}
    >
      <p className = "w-full">{ title }</p>

      <EllipsisHorizontalIcon className="w-6" />
    </Link>
  );
}