import { redirect } from 'next/navigation';
import config from '../../public/zidocs.json';

import { RedirectType } from 'next/dist/client/components/redirect';

export default function NotFound() {
  if (config.navigation[0].pages[0]) {
    redirect(`/${config.navigation[0].pages[0]}`, RedirectType.push);
  } else {
    return <h1>Not Found</h1>;
  }
}
