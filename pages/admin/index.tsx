import { signIn, useSession } from "next-auth/react";

export default function Admin() {
  const { data: session, status } = useSession();
  console.log(session, status);
  return (
    <div>
      <h1>Login Page</h1>
      <p onClick={() => signIn()}>Login</p>
    </div>
  );
}
