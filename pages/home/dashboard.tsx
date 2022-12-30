import Sidebar from "@components/sidebar";
import AdminCard from "@components/admincard";
import { GrAdd } from "react-icons/gr";

export default function dashboard(){
    return(
        <div className="flex-col">
            <Sidebar />
            <div className="flex-col bg-gray-200 h-full rounded-l-md p-14 w-screen">
                  <div className="flex justify-between pb-9">
                      <div>
                          <h1 className="text-4xl font-bold">Post</h1>
                      </div>
                     <div className="rounded-lg bg-gray-300 inline-flex items-center px-3 py-2 text-center transition-all hover:shadow-[1px_1px_1px_grey] gap-2">
                        < GrAdd />
                           Create Post
                      </div>
                    </div>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
                        <AdminCard Image="https://source.unsplash.com/pgnUYPG3E_s" Title="Komunitas A" Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " Category="Kemahasiswaan" Date="2022-01-17"/>
                        <AdminCard Image="https://source.unsplash.com/pgnUYPG3E_s" Title="Komunitas B" Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " Category="Advokasi" Date="2022-01-17"/>
                        <AdminCard Image="https://source.unsplash.com/pgnUYPG3E_s" Title="Komunitas C" Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " Category="Ditmawa" Date="2022-01-17"/>
                        <AdminCard Image="https://source.unsplash.com/pgnUYPG3E_s" Title="Komunitas D" Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " Category="Eksekutif" Date="2022-01-17"/>
                        <AdminCard Image="https://source.unsplash.com/pgnUYPG3E_s" Title="Komunitas E" Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " Category="Kemahasiswaan" Date="2022-01-17"/>
                        <AdminCard Image="https://source.unsplash.com/pgnUYPG3E_s" Title="Komunitas F" Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " Category="Kemahasiswaan" Date="2022-01-17"/>
                        <AdminCard Image="https://source.unsplash.com/pgnUYPG3E_s" Title="Komunitas G" Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " Category="Kemahasiswaan" Date="2022-01-17"/>
                        <AdminCard Image="https://source.unsplash.com/pgnUYPG3E_s" Title="Komunitas H" Desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " Category="Kemahasiswaan" Date="2022-01-17"/>    
                </div>

            </div>
        </div>
    )
}
