import { getCsrfToken, getSession, signIn } from "next-auth/react";
import {useRouter} from "next/router";
import { FormEvent } from "react";

export default function SignIn({ csrfToken }) {
  const router = useRouter();

  const loginHandler = async (event: FormEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const data = new FormData(target);

    const result = await signIn("credentials", {
      redirect: false,
      username: data.get("username"),
      password: data.get("password"),
      callbackUrl: "/",
    });

    if(result.error) {
      alert(result.error);
    }

    if (result.ok) {
      router.push("/");
    }

  };

  return (
    <form onSubmit={loginHandler}>
      <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
      <label>
        Username
        <input name='username' type='text' />
      </label>
      <label>
        Password
        <input name='password' type='password' />
      </label>
      <button type='submit'>Sign in</button>
    </form>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
