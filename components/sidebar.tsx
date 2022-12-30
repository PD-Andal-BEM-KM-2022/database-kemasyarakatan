import { HiUserCircle } from 'react-icons/hi';
import { RiPencilFill } from 'react-icons/ri'

export default function Sidebar(){
    return (
           <div className="bg-white px-5 fixed pt-10 w-2/12 h-screen flex justify-center items-center">
                   <div className="flex flex-col justify-center items-center w-full h-screen ">
                        <HiUserCircle className='justify-center items-center w-full h-32 fill-grey' />
                        <h1 className=" mt-5 text-center text-4xl font-semibold">
                             admin
                        </h1>
                        <div className='flex mt-10 text-center font-semibold bg-gray-200 rounded-lg px-2 py-1 gap-3 w-3/4'>
                            <RiPencilFill className='w-5 h-5' />
                            <h3>
                                Post
                            </h3>
                        </div>
                    </div>
           </div>
       )
}