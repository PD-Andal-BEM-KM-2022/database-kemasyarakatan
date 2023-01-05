import { BsTagFill } from "react-icons/bs";
import { BsCalendarFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { HiTrash } from "react-icons/hi";
import { useState } from "react";

export default function AdminCard(props) {
	const [isOpen, setIsOpen] = useState("hidden");
	const [isHoverA, setIsHoverA] = useState("black");
	const [isHoverB, setIsHoverB] = useState("black");

	// Form data
	const [title, setTitle] = useState("");
	const [date, setDate] = useState("");
	const [category, setCategory] = useState("");
	const [content, setContent] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(e);

		// Form data
		const data = {
			title: title,
			date: date,
			category: category,
			content: content,
		};
		console.log(data);

		// TODO: Adjust this to work with the new API
		// const res = await fetch("/api/post/update-post", {
		//   method: "POST",
		//   body: JSON.stringify({
		//     id: props.ID,
		//     title: e.target.title.value,
		//     content: e.target.content.value,
		//     img: e.target.img.value,
		//     community: e.target.community.value,
		//   }),
		//   headers: {
		//     "Content-Type": "application/json",
		//   },
		// });
		// const result = await res.json();
		// console.log(result);

		setIsOpen("hidden");
		resetForm(e);
	};

	// Reset the form
	const resetForm = (e) => {
		e.target.reset();

		setTitle("");
		setDate("");
		setCategory("");
		setContent("");
	};

	return (
		<>
			<div className=" bg-white rounded-lg shadow-md w-96 h-4/12 dark:bg-gray-800 dark:border-gray-700 transition-all hover:shadow-[1px_8px_20px_grey] shrink">
				<div className="w-full h-[125px]">
					<img
						className="rounded-t-lg object-cover w-full h-[125px]"
						src={props.Image}
						alt={props.Title}
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
									<form id="editPost" onSubmit={handleSubmit}>
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												<input
													type="text"
													id="title"
													onChange={(e) => setTitle(e.target.value)}
													className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
													placeholder={props.Title}
												/>
											</p>
										</div>
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												<input
													type="text"
													id="date"
													onChange={(e) => setDate(e.target.value)}
													className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
													placeholder={props.Date}
												/>
											</p>
										</div>
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												<input
													type="text"
													id="category"
													onChange={(e) => setCategory(e.target.value)}
													className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
													placeholder={props.Category}
												/>
											</p>
										</div>
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												<textarea
													id="content"
													onChange={(e) => setContent(e.target.value)}
													className="w-full h-[200px] px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
													placeholder={props.Desc}
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
								form="editPost"
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
