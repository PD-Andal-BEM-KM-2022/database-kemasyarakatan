import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {useRouter} from "next/router";
import { getSession } from "next-auth/react";

export default function Admin(props: any) {
  const router = useRouter();
  const logoutHandler = async () => {
    await signOut({ redirect: false, callbackUrl: '/auth/login' });
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <Link href='/auth/login' onClick={logoutHandler}>
        Logout
      </Link>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  console.log('session', session);
  if (!session) {
    console.log('session', session);
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}