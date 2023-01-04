import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Community() {
	// Data fetching
	// const router = useRouter();
	// const { community } = router.query;

	// Dummy data after fetch
	const data = {
		title: "Community Title",
		views: 26,
		contact: {
			name: "John Doe",
			email: "john@doe.com",
			phone: "08123456789",
		},
		tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum facilis cupiditate quod temporibus aspernatur beatae quae repellendus veniam adipisci, nam incidunt facere vel sapiente? Iusto dolorem magni suscipit consequatur laudantium eos, neque corrupti nesciunt aut in doloremque sit a quod?",
		image: "https://dummyimage.com/600x400/000/fff",
	};

	return (
		<div className="px-12 py-10 lg:my-24 lg:mx-36">
			{/* Community Title */}
			<div className="flex gap-5 items-center">
				<Link href={"/"} className="w-3 h-10 flex lg:w-8">
					<svg
						viewBox="0 0 14 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11.6667 23.6667L0 12L11.6667 0.333344L13.7375 2.40418L4.14167 12L13.7375 21.5958L11.6667 23.6667Z"
							fill="black"
						/>
					</svg>
				</Link>
				<h1 className="font-bold text-2xl lg:text-5xl">{data.title}</h1>
			</div>

			<div className="flex flex-col lg:mt-8 lg:gap-10 lg:flex-row">
				{/* Image */}
				<div className="w-full h-full lg:min-h-[1/2] bg-yellow-300 lg:object-contain lg:w-1/3 lg:h-1/3 mt-2">
					<Image
						src={data.image}
						width={200}
						height={200}
						alt={data.title}
						className="w-full h-full object-cover"
					/>
				</div>

				{/* Metas */}
				<div>
					{/* Views */}
					<div className="flex gap-3 items-center mt-4">
						<div>
							<svg
								width="22"
								height="16"
								viewBox="0 0 22 16"
								fill="none"
								className="lg:w-6 lg:h-6"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M11 2.5C12.8387 2.49389 14.6419 3.00678 16.2021 3.97973C17.7624 4.95267 19.0164 6.34616 19.82 8C18.17 11.37 14.8 13.5 11 13.5C7.2 13.5 3.83 11.37 2.18 8C2.98362 6.34616 4.23763 4.95267 5.79788 3.97973C7.35813 3.00678 9.16126 2.49389 11 2.5M11 0.5C6 0.5 1.73 3.61 0 8C1.73 12.39 6 15.5 11 15.5C16 15.5 20.27 12.39 22 8C20.27 3.61 16 0.5 11 0.5ZM11 5.5C11.663 5.5 12.2989 5.76339 12.7678 6.23223C13.2366 6.70107 13.5 7.33696 13.5 8C13.5 8.66304 13.2366 9.29893 12.7678 9.76777C12.2989 10.2366 11.663 10.5 11 10.5C10.337 10.5 9.70107 10.2366 9.23223 9.76777C8.76339 9.29893 8.5 8.66304 8.5 8C8.5 7.33696 8.76339 6.70107 9.23223 6.23223C9.70107 5.76339 10.337 5.5 11 5.5M11 3.5C8.52 3.5 6.5 5.52 6.5 8C6.5 10.48 8.52 12.5 11 12.5C13.48 12.5 15.5 10.48 15.5 8C15.5 5.52 13.48 3.5 11 3.5Z"
									fill="black"
								/>
							</svg>
						</div>

						<p className="text-sm lg:text-xl">
							<span className="font-bold">{data.views}</span> dilihat
						</p>
					</div>

					{/* Contact */}
					<div className="flex flex-col gap-2 items-start mt-4">
						{/* Telephone / WhatsApp */}
						<div className="flex gap-3 font-bold items-center justify-center">
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								className="lg:w-6 lg:h-6"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M17.0854 2.91005C16.164 1.98398 15.0665 1.24972 13.8569 0.750108C12.6473 0.250493 11.3499 -0.0044801 10.0402 5.95695e-05C4.55276 5.95695e-05 0.0804022 4.45005 0.0804022 9.91003C0.0804022 11.66 0.542714 13.36 1.40704 14.86L0 20L5.27638 18.62C6.73367 19.41 8.37186 19.83 10.0402 19.83C15.5276 19.83 20 15.38 20 9.92003C20 7.27004 18.9648 4.78005 17.0854 2.91005ZM10.0402 18.15C8.55276 18.15 7.09548 17.75 5.81909 17L5.51759 16.82L2.38191 17.64L3.21608 14.6L3.01508 14.29C2.18869 12.977 1.74989 11.4593 1.74874 9.91003C1.74874 5.37004 5.46734 1.67005 10.0301 1.67005C12.2412 1.67005 14.3216 2.53005 15.8794 4.09005C16.6507 4.85401 17.262 5.7627 17.6778 6.76346C18.0936 7.76422 18.3056 8.83714 18.3015 9.92003C18.3216 14.46 14.603 18.15 10.0402 18.15ZM14.5829 11.99C14.3317 11.87 13.1055 11.27 12.8844 11.18C12.6533 11.1 12.4925 11.06 12.3216 11.3C12.1508 11.55 11.6784 12.11 11.5377 12.27C11.397 12.44 11.2462 12.46 10.995 12.33C10.7437 12.21 9.9397 11.94 8.99497 11.1C8.25126 10.44 7.75879 9.63003 7.60804 9.38003C7.46734 9.13003 7.58794 9.00003 7.71859 8.87003C7.82914 8.76003 7.96985 8.58003 8.09045 8.44003C8.21105 8.30003 8.26131 8.19003 8.34171 8.03004C8.42211 7.86004 8.38191 7.72004 8.32161 7.60004C8.26131 7.48004 7.75879 6.26004 7.55779 5.76004C7.35678 5.28004 7.14573 5.34004 6.99497 5.33004H6.51256C6.34171 5.33004 6.0804 5.39004 5.84925 5.64004C5.62814 5.89004 4.98492 6.49004 4.98492 7.71004C4.98492 8.93003 5.8794 10.11 6 10.27C6.1206 10.44 7.75879 12.94 10.2513 14.01C10.8442 14.27 11.3065 14.42 11.6683 14.53C12.2613 14.72 12.804 14.69 13.2362 14.63C13.7186 14.56 14.7136 14.03 14.9146 13.45C15.1256 12.87 15.1256 12.38 15.0553 12.27C14.9849 12.16 14.8342 12.11 14.5829 11.99Z"
									fill="black"
								/>
							</svg>
							<p className="lg:text-xl">
								{data.contact.phone}{" "}
								<span className="text-sm lg:text-lg">
									({data.contact.name})
								</span>
							</p>
						</div>
						{/* Email */}
						<div className="flex gap-3 font-bold items-center justify-center">
							<svg
								width="21"
								height="17"
								viewBox="0 0 21 17"
								fill="none"
								className="lg:w-6 lg:h-6"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M2.66669 16.3333C2.11669 16.3333 1.64602 16.1377 1.25469 15.7463C0.862687 15.3543 0.666687 14.8833 0.666687 14.3333V2.33333C0.666687 1.78333 0.862687 1.31266 1.25469 0.921328C1.64602 0.529328 2.11669 0.333328 2.66669 0.333328H18.6667C19.2167 0.333328 19.6877 0.529328 20.0797 0.921328C20.471 1.31266 20.6667 1.78333 20.6667 2.33333V14.3333C20.6667 14.8833 20.471 15.3543 20.0797 15.7463C19.6877 16.1377 19.2167 16.3333 18.6667 16.3333H2.66669ZM18.6667 4.33333L11.1917 9.00833C11.1084 9.05833 11.0207 9.09566 10.9287 9.12033C10.8374 9.14566 10.75 9.15833 10.6667 9.15833C10.5834 9.15833 10.496 9.14566 10.4047 9.12033C10.3127 9.09566 10.225 9.05833 10.1417 9.00833L2.66669 4.33333V14.3333H18.6667V4.33333ZM10.6667 7.33333L18.6667 2.33333H2.66669L10.6667 7.33333ZM2.66669 4.33333V4.58333V3.10833V3.13333V2.33333V3.13333V3.12033V4.58333V4.33333V14.3333V4.33333Z"
									fill="black"
								/>
							</svg>
							<p className="lg:text-xl">
								{data.contact.email}{" "}
								<span className="text-sm lg:text-lg">
									({data.contact.name})
								</span>
							</p>
						</div>
					</div>

					{/* Tags */}
					<div className="flex flex-wrap gap-3 lg:gap-5 mt-6 lg:mt-8">
						{data.tags.map((tag) => (
							<div className="bg-gray-300 px-4 py-1 rounded-xl font-bold uppercase lg:px-5 lg:py-2">
								<p className="text-sm lg:text-lg">{tag}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Contents */}
			<p className="mt-6 tracking-wide lg:text-xl">{data.content}</p>
		</div>
	);
}
