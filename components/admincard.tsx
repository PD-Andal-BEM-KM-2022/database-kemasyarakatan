import { BsTagFill } from "react-icons/bs";
import { BsCalendarFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { HiTrash } from "react-icons/hi";
<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import { useState } from "react";
import Image from "next/image";
>>>>>>> 46d8898 (minor)

export default function AdminCard(props) {
	const [isOpen, setIsOpen] = useState("hidden");
	const [isHoverA, setIsHoverA] = useState("black");
	const [isHoverB, setIsHoverB] = useState("black");

	useEffect(() => {
		console.log(props.Desc);
	}, []);


	const handleSubmit = async (e) => {
		e.preventDefault();
<<<<<<< HEAD

		// Separate paragraphs
		const contents = e.target.content.value
			.split("\n")
			.filter((item) => item !== "");

		// Filter null contacts
		const contacts = {
			name: e.target.name.value,
			email: e.target.email.value,
			phone: e.target.phone.value,
			facebook: e.target.facebook.value,
			instagram: e.target.instagram.value,
			twitter: e.target.twitter.value,
		};
		for (const [key, value] of Object.entries(contacts)) {
			if (value === "") {
				delete contacts[key];
			}
		}

		// Form data
		const data = {
			id: props.ID,
			title: e.target.title.value,
			content: contents,
			location: e.target.location.value,
			contact: contacts,
		};
		console.log(data);
=======
		const data = {
			title,
			date,
			category,
			content,
			id: props.ID
		}
		console.log('inner', data);
		// Form data
		
>>>>>>> 46d8898 (minor)

		const res = await fetch("/api/v2/post", {
			method: "PATCH",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const result = await res.json();
		console.log(result);

		setIsOpen("hidden");
		// resetForm(e);
	};

	// Reset the form
	const resetForm = (e) => {
		e.target.reset();
		window.location.reload();
	};

	// Delete post
	const handleDelete = async (e) => {
		e.preventDefault();
		console.log(props.ID);

		const res = await fetch("/api/v2/post", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				postId: props.ID,
			}),
		});
		const result = await res.json();
		console.log(result);

		window.location.reload();
	};

	return (
		<>
			<div className=" bg-white rounded-lg shadow-md w-96 h-4/12 dark:bg-gray-800 dark:border-gray-700 transition-all hover:shadow-[1px_8px_20px_grey] shrink">
				<div className="w-full h-[125px]">
					<Image
						className="rounded-t-lg object-cover w-full h-[125px]"
						src={props.Image}
						alt={props.Title}
						width={500}
						height={500}
					/>
				</div>
				<div className="p-5">
					<div className="flex flex-row justify-between items-center">
						<h5 className="mb-2  font-bold tracking-tight text-gray-900 dark:text-white">
							{props.Title}
						</h5>
						<div className="flex flex-row gap-2 items-center justify-center">
							<button
								onClick={() => {
									setIsOpen("block");
								}}
								onMouseEnter={() => {
									setIsHoverA("red");
								}}
								onMouseLeave={() => {
									setIsHoverA("black");
								}}
								className="mr-2"
							>
								<FaEdit color={isHoverA} />
							</button>
							<button
								onClick={handleDelete}
								className="mr-2"
								onMouseEnter={() => {
									setIsHoverB("red");
								}}
								onMouseLeave={() => {
									setIsHoverB("black");
								}}
							>
								<HiTrash color={isHoverB} />
							</button>
						</div>
					</div>
					<p className="mb-3 truncate ... font-normal text-xs text-gray-700 dark:text-gray-400">
						{props.Desc}
					</p>
					<div className="flex-row justify-between">
						<div className="flex gap-2 mb-3">
							<BsTagFill />
							<p className="text-xs uppercase">{props.Category}</p>
						</div>
						<div className="flex gap-2 mb-2">
							<BsCalendarFill />
							<p className="text-xs">{props.Date}</p>
						</div>
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
										Edit Post
									</h3>
									<form id={props.ID} onSubmit={handleSubmit}>
										{/* Title */}
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												<input
													type="text"
													id="title"
<<<<<<< HEAD
=======
													value={title}
													onChange={(e) => {
														console.log(e.target.value);
														setTitle(e.target.value);
													}}
>>>>>>> 46d8898 (minor)
													className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
													placeholder={
														props.Title !== "" ? props.Title : "Judul Postingan"
													}
												/>
											</p>
										</div>
										{/* Location */}
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												<input
													type="text"
													id="location"
													className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
													placeholder={
														props.Location !== "" ? props.Location : "Lokasi"
													}
												/>
											</p>
										</div>
										{/* Contacts - Name */}
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												<input
													type="text"
													id="name"
													className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
													placeholder={
														props.Contact.name !== null
															? props.Contact.name
															: "Nama"
													}
												/>
											</p>
										</div>
										{/* Phone */}
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												<input
													type="number"
													id="phone"
													className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
													placeholder={
														props.Contact.phone !== null
															? props.Contact.phone
															: "No. HP"
													}
												/>
											</p>
										</div>
										{/* Email */}
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												<input
													type="email"
													id="email"
													className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
													placeholder={
														props.Contact.email !== null
															? props.Contact.email
															: "Email"
													}
												/>
											</p>
										</div>
										{/* Facebook */}
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												<input
													type="text"
													id="facebook"
													className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
													placeholder={
														props.Contact.facebook !== null
															? props.Contact.facebook
															: "Facebook"
													}
												/>
											</p>
										</div>
										{/* Instagram */}
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												<input
													type="text"
													id="instagram"
													className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
													placeholder={
														props.Contact.instagram !== null
															? props.Contact.instagram
															: "Instagram"
													}
												/>
											</p>
										</div>
										{/* Twitter */}
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												<input
													type="text"
													id="twitter"
													className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
													placeholder={
														props.Contact.twitter !== null
															? props.Contact.twitter
															: "Twitter"
													}
												/>
											</p>
										</div>
										{/* Content */}
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												<textarea
													id="content"
													className="w-full h-[200px] px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
													placeholder={
														props.Desc !== null
															? props.Desc.join("\n\n")
															: "Deskripsi (paragraf terpisah dengan enter)"
													}
												/>
											</p>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
							<button
								type="submit"
								form={props.ID}
								className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
							>
								Edit
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
		</>
	);
}
