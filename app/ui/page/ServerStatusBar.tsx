import { auth } from '@/auth';
import ClientStatusBar from './ClientStatusBar';

export default async function ServerStatusBar() {
  const session = await auth();
  const date = new Date();

  const dayOfWeek = date.toLocaleString('default', { weekday: 'short' });
  const month = date.toLocaleString('default', { month: 'short' });
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  let hours = date.getHours();
  let minutes = String(date.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';

  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }
  
  const formattedDate = `${dayOfWeek} ${month} ${day} ${hours}:${minutes} ${period}`;

  return <ClientStatusBar 
    session={session} 
    formattedDate={formattedDate} 
  />;
}