import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/v2/post");
  const data = await res.json();

  // map data to an array of path objects with params (id)
  const paths = data.posts.map((item) => {
    return {
      params: { id: item.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch("http://localhost:3000/api/v2/post?id=" + id);
  const data = await res.json();

  return {
    props: { ninja: data, id: id },
  };
};

export default function Community({ ninja, id }) {
  const [inputComment, setInputComment] = useState("");
  const [comment, setComment] = useState([]);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    // setLoading(true);
    // fetch(`/api/v2/post?id=${id}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     setData(data);
    //     setLoading(false);
    //     // console.log(data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     alert(
    //       `Terjadi kesalahan pada fetch data post dengan id ${id}`
    //     );
    //   });

    fetch(`/api/v2/comment?postId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        // setData(data);
        setComment(data.comment.reverse());
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
        alert(`Terjadi kesalahan pada fetch data post dengan id ${id}`);
      });
  }, [submit]);

  let commentDate = [];
  let commentTime = [];
  comment?.forEach((item) => {
    let temp = item.createdAt.split("T");
    commentDate.push(temp[0]);
    let temp2 = temp[1].split(".");
    commentTime.push(temp2[0]);
  });

  // if (isLoading) return <p>Loading...</p>;
  // if (!ninja) return <p>No profile data</p>;

  let instagram = ninja.contact?.instagram;
  let parts = instagram?.split("https://instagram.com/");
  let username = parts[1];

  // const comment = Object.values(data.comments);

  function submitComment(e) {
    e.preventDefault();
    setInputComment("");
    fetch(`/api/v2/comment`, {
      method: "POST",
      body: JSON.stringify({
        postId: id,
        comment: inputComment,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    alert("Komentar berhasil ditambahkan");
    setSubmit(!submit);
    // window.location.reload();
  }

  if (!ninja) return <p>Loading...</p>;
  return (
    <>
      <Head>
        <title>{ninja.title}</title>
      </Head>
      <div className="px-12 py-10 lg:my-24 lg:mx-36">
        {/* Community Title */}
        <div className="flex gap-5 items-center">
          <Link href="/" className="w-3 h-10 flex lg:w-8">
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
          <h1 className="font-bold text-2xl lg:text-5xl">{ninja.title}</h1>
        </div>
        <div className="flex flex-col lg:mt-8 lg:gap-10 lg:flex-row">
          {/* Image */}
          <div className="w-full h-full lg:min-h-[1/2] bg-yellow-300 lg:object-contain lg:w-1/3 lg:h-1/3 mt-2">
            <Image
              src={ninja.img[0]}
              width={200}
              height={200}
              alt={ninja.title}
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
                <span className="font-bold">{ninja.views}</span> dilihat
              </p>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-2 items-start mt-4">
              {ninja.contact.phone ? (
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
                    {ninja.contact.phone}{" "}
                    <span className="text-sm lg:text-lg">
                      (
                      {ninja.contact.phone ? (
                        <span>{ninja.contact.name}</span>
                      ) : null}
                      )
                    </span>
                  </p>
                </div>
              ) : null}

              {/* Email */}
              {ninja.contact.email ? (
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
                  <p className="lg:text-xl">{ninja.contact.email}</p>
                </div>
              ) : null}

              {/* Facebook */}
              {ninja.contact.facebook ? (
                <div className="flex gap-3 font-bold items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="2 2 20 20"
                    fill="none"
                    className="lg:w-6 lg:h-6"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 19h5V5H5v14h7v-5h-2v-2h2v-1.654c0-1.337.14-1.822.4-2.311A2.726 2.726 0 0 1 13.536 6.9c.382-.205.857-.328 1.687-.381.329-.021.755.005 1.278.08v1.9H16c-.917 0-1.296.043-1.522.164a.727.727 0 0 0-.314.314c-.12.226-.164.45-.164 1.368V12h2.5l-.5 2h-2v5zM4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
                      fill="black"
                    />
                  </svg>
                  <p className="lg:text-xl">{ninja.contact.facebook}</p>
                </div>
              ) : null}
              {/*Instagram */}
              {ninja.contact.instagram ? (
                <div className="flex gap-3 font-bold items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="lg:w-6 lg:h-6"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                      fill="black"
                    />
                  </svg>
                  <a href={ninja.contact.instagram} className="lg:text-xl">
                    {username}
                  </a>
                </div>
              ) : null}
              {/*Twitter*/}
              {ninja.contact.twitter ? (
                <div className="flex gap-3 font-bold items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="1 1 20 20"
                    fill="none"
                    className="lg:w-6 lg:h-6"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.51,20H8.43a10.87,10.87,0,0,1-4.65-1.09A1.38,1.38,0,0,1,3,17.47a1.41,1.41,0,0,1,1.16-1.18,6.63,6.63,0,0,0,2.54-.89A9.49,9.49,0,0,1,3.19,6.33a1.41,1.41,0,0,1,1-1.15,1.35,1.35,0,0,1,1.43.41,7.09,7.09,0,0,0,4.88,2.75,4.5,4.5,0,0,1,1.41-3.1,4.47,4.47,0,0,1,6.37.19.7.7,0,0,0,.78.1A1.39,1.39,0,0,1,21,7.13a6.66,6.66,0,0,1-1.28,2.6A10.79,10.79,0,0,1,8.51,20Zm0-2h.08a8.79,8.79,0,0,0,9.09-8.59,1.32,1.32,0,0,1,.37-.85,5.19,5.19,0,0,0,.62-1,2.56,2.56,0,0,1-1.91-.85A2.45,2.45,0,0,0,15,6a2.5,2.5,0,0,0-1.79.69,2.53,2.53,0,0,0-.72,2.42l.26,1.14-1.17.08a8.3,8.3,0,0,1-6.54-2.4,7.12,7.12,0,0,0,3.73,6.46l.95.54-.63.9a5.62,5.62,0,0,1-2.68,1.92A8.34,8.34,0,0,0,8.5,18ZM19,6.65h0Z"
                      fill="black"
                    />
                  </svg>
                  <p className="lg:text-xl">{ninja.contact.twitter}</p>
                </div>
              ) : null}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 lg:gap-5 mt-6 lg:mt-8">
              {ninja.metadata.tags.map((tag) => (
                <div className="bg-gray-300 px-4 py-1 rounded-xl font-bold uppercase lg:px-5 lg:py-2">
                  <p className="text-sm lg:text-lg">{tag}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Contents */}
        <div className="mt-6 tracking-wide lg:text-xl">
          {ninja.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="flex-grow mt-10 mb-5 border-t border-gray-400"></div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Comments</h1>
          <form onSubmit={submitComment} className="flex flex-row my-4">
            <input
              type="text"
              className="w-full py-5 rounded-lg"
              value={inputComment}
              onChange={(e) => setInputComment(e.target.value)}
              placeholder="Masukkan Comment"
            />
            <button
              type="submit"
              className="relative bg-black text-white p-5 mx-2 rounded-lg hover:text-black hover:bg-[red]"
            >
              Comment
            </button>
          </form>
          {comment?.map((comment, index) => (
            <div key={index} className="flex flex-col my-2">
              <div className="flex flex-col">
                <div className="flex flex-row gap-2">
                  <h3 className="font-bold text-xl">{commentDate[index]}</h3>
                  <h3 className="text-xl"> - </h3>
                  <h3 className="text-gray text-xl"> {commentTime[index]}</h3>
                </div>
                <p className="text-lg">{comment.comment}</p>
              </div>
              <div className="flex-grow mt-3 mb-3 border-t border-gray-400"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
