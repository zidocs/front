import { redirect } from 'next/navigation';
import config from '../../public/starter-kit/zidocs.json';

export default function NotFound() {
  redirect(`/${config.navigation[0].pages[0]}`);
}
