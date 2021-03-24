// import Link from 'next/link';
// import s from './Navbar.module.css';

import { useUser } from '@/utils/useUser';

const lesson2 = () => {
  const { user, signOut } = useUser();

  return (
    <section>
        <h2>Welcome to level 2</h2>
    </section>
  );
};

export default lesson2;
