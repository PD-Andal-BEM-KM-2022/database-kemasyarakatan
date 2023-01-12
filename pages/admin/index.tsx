import { getSession, useSession } from "next-auth/react";
import Sidebar from "@components/sidebar";
import AdminCard from "@components/admincard";
import { GrAdd } from "react-icons/gr";
import { useState, useEffect } from "react";

export default function Admin(props: any) {
  const [isOpen, setIsOpen] = useState("hidden");
  const [data, setData] = useState(null);
  const { status } = useSession();

  useEffect(() => {
    fetch("/api/v2/post")
      .then(res => res.json())
      .then(data => {
        setData(data);
        console.log(data);
      });
  }, []);

  const splitDate = (date: string) => {
    const split = date.split("T");
    return split[0];
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Separate paragraphs
    const contents = e.target.content.value
      .split("\n")
      .filter(item => item !== "");

    // Separate keywords
    const keywords = e.target.keywords.value
      .split(",")
      .filter(item => item !== "")
      .map(item => item.trim());

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
      title: e.target.title.value,
      content: contents,
      location: e.target.location.value,
      image: e.target.image.value,
      contact: contacts,
      keywords: keywords,
      category: e.target.category.value,
    };
    console.log(data);

    // Send data to API
    const res = await fetch("/api/v2/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    console.log(json);

    setIsOpen("hidden");
    resetForm(e);
  };

  const resetForm = e => {
    e.target.reset();
    window.location.reload();
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

<<<<<<< HEAD
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
							className="rounded-lg bg-gray-300 inline-flex items-center px-3 py-2 text-center transition-all hover:shadow-[1px_1px_1px_grey] gap-4 cursor-pointer"
						>
							<GrAdd />
							Create Post
						</div>
					</div>
					<div className="w-full flex flex-wrap gap-10">
						{data &&
							data.posts.map((item: any) => (
								<AdminCard
									Image={item.img}
									Title={item.title}
									Desc={item.content}
									Category={item.category}
									Date={splitDate(item.updatedAt)}
									Keywords={item.keywords}
									Location={item.location}
									Contact={item.contact}
									ID={item.id}
								/>
							))}
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
									<form id="addPost" onSubmit={handleSubmit}>
										{/* Title */}
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												<input
													type="text"
													id="title"
													required
													className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
													placeholder="Judul Post"
												/>
											</p>
										</div>
										{/* Category */}
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												<input
													type="text"
													id="category"
													required
													className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
													placeholder="Kategori"
												/>
											</p>
										</div>
										{/* Location */}
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												<input
													type="text"
													id="location"
													required
													className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
													placeholder="Lokasi"
												/>
											</p>
										</div>
										{/* Contacts - Name */}
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												<input
													type="text"
													id="name"
													required
													className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
													placeholder="Nama Kontak"
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
													placeholder="Nomor"
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
													placeholder="Email"
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
													placeholder="Facebook"
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
													placeholder="Instagram"
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
													placeholder="Twitter"
												/>
											</p>
										</div>
										{/* Content */}
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												<textarea
													id="content"
													required
													className="w-full h-[200px] px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
													placeholder="Deskripsi (paragraf terpisah dengan enter)"
												/>
											</p>
										</div>
										{/* Keywords */}
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												<input
													type="text"
													id="keywords"
													required
													className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
													placeholder="Keywords (pisahkan dengan koma)"
												/>
											</p>
										</div>
										{/* Image */}
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												<input
													type="file"
													id="image"
													required
													className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
													placeholder="Image"
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
								form="addPost"
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
=======
  return (
    <div>
      <div className='w-full h-[100vh] overflow-y-hidden flex flex-row'>
        <Sidebar />
        <div className='flex-col bg-gray-200 w-full h-full rounded-l-md p-14 overflow-y-auto'>
          <div className='flex justify-between pb-9'>
            <div>
              <h1 className='text-4xl font-bold'>Post</h1>
            </div>
            <div
              onClick={() => {
                setIsOpen("block");
              }}
              className='rounded-lg bg-gray-300 inline-flex items-center px-3 py-2 text-center transition-all hover:shadow-[1px_1px_1px_grey] gap-4 cursor-pointer'
            >
              <GrAdd />
              Create Post
            </div>
          </div>
          <div className='w-full flex flex-wrap gap-10'>
            {data &&
              data.posts.map((item: any) => {
				return (
                  <AdminCard
					key={item.id}
                    Image={item.img}
                    Title={item.title}
                    Desc={item.content[0]}
                    Category={item.category}
                    Date={splitDate(item.updatedAt)}
                    Keywords={item.keywords}
                    Location={item.location}
                    Contact={item.contact}
                    ID={item.id}
                  />
                );
              })}
          </div>
        </div>
      </div>

      <div className={`${isOpen} fixed z-10 inset-0 overflow-y-auto`}>
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
            <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
          </div>
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <div
            className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
            role='dialog'
            aria-modal='true'
            aria-labelledby='modal-headline'
          >
            <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
              <div className='sm:flex sm:items-start w-full'>
                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
                  <h3
                    className='text-lg leading-6 font-medium text-gray-900'
                    id='modal-headline'
                  >
                    Add Post
                  </h3>
                  <form id='addPost' onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        <input
                          type='text'
                          id='title'
                          className='w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline'
                          placeholder='Judul Post'
                        />
                      </p>
                    </div>
                    {/* Category */}
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        <input
                          type='text'
                          id='category'
                          className='w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline'
                          placeholder='Kategori'
                        />
                      </p>
                    </div>
                    {/* Location */}
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        <input
                          type='text'
                          id='location'
                          className='w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline'
                          placeholder='Lokasi'
                        />
                      </p>
                    </div>
                    {/* Contacts - Name */}
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        <input
                          type='text'
                          id='name'
                          className='w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline'
                          placeholder='Nama Kontak'
                        />
                      </p>
                    </div>
                    {/* Phone */}
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        <input
                          type='number'
                          id='phone'
                          className='w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline'
                          placeholder='Nomor'
                        />
                      </p>
                    </div>
                    {/* Email */}
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        <input
                          type='email'
                          id='email'
                          className='w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline'
                          placeholder='Email'
                        />
                      </p>
                    </div>
                    {/* Facebook */}
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        <input
                          type='text'
                          id='facebook'
                          className='w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline'
                          placeholder='Facebook'
                        />
                      </p>
                    </div>
                    {/* Instagram */}
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        <input
                          type='text'
                          id='instagram'
                          className='w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline'
                          placeholder='Instagram'
                        />
                      </p>
                    </div>
                    {/* Twitter */}
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        <input
                          type='text'
                          id='twitter'
                          className='w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline'
                          placeholder='Twitter'
                        />
                      </p>
                    </div>
                    {/* Content */}
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        <textarea
                          id='content'
                          className='w-full h-[200px] px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline'
                          placeholder='Deskripsi (paragraf terpisah dengan enter)'
                        />
                      </p>
                    </div>
                    {/* Keywords */}
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        <input
                          type='text'
                          id='keywords'
                          className='w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline'
                          placeholder='Keywords (pisahkan dengan koma)'
                        />
                      </p>
                    </div>
                    {/* Image */}
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        <input
                          type='file'
                          id='image'
                          className='w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline'
                          placeholder='Image'
                        />
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
              <button
                type='submit'
                form='addPost'
                className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
              >
                Post
              </button>
              <button
                onClick={() => {
                  setIsOpen("hidden");
                }}
                type='button'
                className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
>>>>>>> 46d8898 (minor)
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
