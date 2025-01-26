import Link from 'next/link';
import TextFieldBook from '../ui/editor/textfield-book';
import { auth } from '@/auth';

export default async function HomePage() {
  const session = await auth();

  return (
    <div className = "page">
      <div>
        <h3>What book moved you this week?</h3>
        {/* <h3>Logged in as: {session?.user?.email}</h3> */}

        { session?.user ? (
        <p>Logged in as: {session.user.email}</p>
      ) : (
        <Link href="/login">Log in</Link>
      )}
      </div>

      <TextFieldBook/>
      
    </div>
  );
}