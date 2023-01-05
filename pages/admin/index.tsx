import { getSession, useSession } from "next-auth/react";
import Sidebar from "@components/sidebar";
import AdminCard from "@components/admincard";
import { GrAdd } from "react-icons/gr";
import { useState } from "react";

export default function Admin(props: any) {
	const [isOpen, setIsOpen] = useState("hidden");
	const { status } = useSession();

	if (status === "loading") {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<div className="w-full h-[100vh] overflow-y-hidden flex flex-row">
				<Sidebar />
				<div className="flex-col bg-gray-200 w-full h-full rounded-l-md p-14 overflow-y-auto">
					<div className="flex justify-between pb-9">
						<div>
							<h1 className="text-4xl font-bold">Post</h1>
						</div>
						<div
							onClick={() => {
								setIsOpen("block");
							}}
							className="rounded-lg bg-gray-300 inline-flex items-center px-3 py-2 text-center transition-all hover:shadow-[1px_1px_1px_grey] gap-4"
						>
							<GrAdd />
							Create Post
						</div>
					</div>
					<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-auto gap-x-8 gap-y-8">
						<AdminCard
							Image="https://source.unsplash.com/pgnUYPG3E_s"
							Title="Komunitas A"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
							Category="Kemahasiswaan"
							Date="2022-01-17"
						/>
						<AdminCard
							Image="https://source.unsplash.com/pgnUYPG3E_s"
							Title="Komunitas B"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
							Category="Advokasi"
							Date="2022-01-17"
						/>
						<AdminCard
							Image="https://source.unsplash.com/pgnUYPG3E_s"
							Title="Komunitas C"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
							Category="Ditmawa"
							Date="2022-01-17"
						/>
						<AdminCard
							Image="https://source.unsplash.com/pgnUYPG3E_s"
							Title="Komunitas D"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
							Category="Eksekutif"
							Date="2022-01-17"
						/>
						<AdminCard
							Image="https://source.unsplash.com/pgnUYPG3E_s"
							Title="Komunitas E"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
							Category="Kemahasiswaan"
							Date="2022-01-17"
						/>
						<AdminCard
							Image="https://source.unsplash.com/pgnUYPG3E_s"
							Title="Komunitas F"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
							Category="Kemahasiswaan"
							Date="2022-01-17"
						/>
						<AdminCard
							Image="https://source.unsplash.com/pgnUYPG3E_s"
							Title="Komunitas G"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
							Category="Kemahasiswaan"
							Date="2022-01-17"
						/>
						<AdminCard
							Image="https://source.unsplash.com/pgnUYPG3E_s"
							Title="Komunitas H"
							Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
							Category="Kemahasiswaan"
							Date="2022-01-17"
						/>
					</div>
				</div>
			</div>

			<div className={`${isOpen} fixed z-10 inset-0 overflow-y-auto`}>
				<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<div className="fixed inset-0 transition-opacity" aria-hidden="true">
						<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
					</div>
					<span
						className="hidden sm:inline-block sm:align-middle sm:h-screen"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<div
						className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
						role="dialog"
						aria-modal="true"
						aria-labelledby="modal-headline"
					>
						<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
							<div className="sm:flex sm:items-start w-full">
								<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
									<h3
										className="text-lg leading-6 font-medium text-gray-900"
										id="modal-headline"
									>
										Add Post
									</h3>
									<div className="mt-2">
										<p className="text-sm text-gray-500">
											<input
												type="text"
												className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
												placeholder="Judul Post"
											/>
										</p>
									</div>
									<div className="mt-2">
										<p className="text-sm text-gray-500">
											<input
												type="text"
												className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
												placeholder="Date"
											/>
										</p>
									</div>
									<div className="mt-2">
										<p className="text-sm text-gray-500">
											<input
												type="text"
												className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
												placeholder="Kategori"
											/>
										</p>
									</div>
									<div className="mt-2">
										<p className="text-sm text-gray-500">
											<textarea
												className="w-full h-[200px] px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
												placeholder="Deskripsi"
											/>
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
							<button
								type="button"
								className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
							>
								Post
							</button>
							<button
								onClick={() => {
									setIsOpen("hidden");
								}}
								type="button"
								className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
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
