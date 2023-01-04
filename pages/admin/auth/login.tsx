import { getCsrfToken, getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
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

		if (result.error) {
			alert(result.error);
		}

		if (result.ok) {
			router.push("/");
		}
	};

	return (
		<form
			onSubmit={loginHandler}
			className="flex flex-col justify-center  h-screen px-8 items-center"
		>
			<div className="bg-gray-300 px-8 py-6 rounded-xl font-bold lg:text-xl">
				<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
				<div className="mb-4">
					<label>
						Username
						<input
							name="username"
							type="text"
							className="mt-1 rounded-lg hover:ring-2 hover:ring-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 font-normal w-full lg:h-8 px-2"
						/>
					</label>
				</div>

				<div>
					<label>
						Password
						<input
							name="password"
							type="password"
							className="mt-1 rounded-lg hover:ring-2 hover:ring-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 w-full lg:h-8 px-2"
						/>
					</label>
				</div>
				<button
					type="submit"
					className="mt-10 bg-gray-600 px-4 py-2 rounded-lg text-white font-bold hover:bg-gray-700 transition duration-200"
				>
					Sign in
				</button>
			</div>
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
