import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { getSession } from "next-auth/react";

export default function Admin(props: any) {
  const { status } = useSession();
  const logoutHandler = async () => {
    await signOut({ redirect: false, callbackUrl: "/auth/login" });
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

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
  if (!session) {
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
