import Link from 'next/link';
import BookLinks from './book-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import styles from '@/app/ui/home.module.css';

export default function SideNav() {
  const link = { name: 'New', href: '/editor', icon: PowerIcon };

  return (
    <div className="flex flex-col h-full px-4 py-4 bg-slate-100">
      <div className = { styles.sidenav }>
        <Link className="flex h-16 items-center px-4" href="/">
          Quotes
        </Link>

        <div className="flex-1 overflow-y-auto min-h-0">
          <BookLinks/>
        </div>

        <Link className="flex h-16 items-center px-4" href="/player">
          Quotes Player
        </Link>
      </div>
    </div>
  );
}