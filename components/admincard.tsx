import { BsTagFill } from "react-icons/bs";
import { BsCalendarFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { HiTrash } from "react-icons/hi";

export default function AdminCard(props) {
  return (
    <>
      <div className=" bg-white rounded-lg shadow-md w-96 h-4/12 dark:bg-gray-800 dark:border-gray-700 transition-all hover:shadow-[1px_8px_20px_grey] shrink">
        <a href={props.Link} className="w-full h-[125px]">
          <img
            className="rounded-t-lg object-cover w-full h-[125px]"
            src={props.Image}
            alt=""
          />
        </a>
        <div className="p-5">
          <a href="#">
            <div className="flex flex-row justify-between">
              <h5 className="mb-2  font-bold tracking-tight text-gray-900 dark:text-white">
                {props.Title}
              </h5>
              <div  className="flex flex-row gap-2">
                <FaEdit />
                <HiTrash className="fill-red" />
              </div>
            </div>
          </a>
          <p className="mb-3 font-normal text-xs text-gray-700 dark:text-gray-400">
            {props.Desc}
          </p>
          <div className="flex-row justify-between">
            <div className="flex gap-2 mb-3">
              <BsTagFill />
              <a className="text-xs">{props.Category}</a>
            </div>
            <div className="flex gap-2 mb-2">
              <BsCalendarFill />
              <a className="text-xs">{props.Date}</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
