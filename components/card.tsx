
export default function Card(props){

    let word = []
    let desc = props.Desc;
    desc = desc.replace(/(<([^>]+)>)/gi, ""); // remove html tags
    desc = desc.replace(props.Title, ""); // remove title from desc
    desc = desc.replace("Deskripsi", ""); // remove "Deskripsi" from desc
    desc = desc.replace("Homebase", " Homebase : "); // remove "Deskripsi" from desc

    if(desc.length > 200){
        word = desc.split(" ")
        desc = word.slice(0, 20).join(" ") + "..."
    }

    return(
            <>
            
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transition-all hover:shadow-[1px_8px_20px_grey]">
                    <a href={props.Link} className="w-full h-[250px]">
                        <img className="rounded-t-lg object-cover w-full h-[250px]" src={props.Image} alt="Image Postingan" />
                    </a> 
                    <div className="p-5 flex flex-col justify-between">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate">{props.Title}</h5>
                        </a>
                        <p className="desc mb-3 font-normal text-gray-700 text-justify dark:text-gray-400 min-h-[100px]">{desc}</p>
                        <a href={props.Link} className="w-[37.5%] inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </a>
                    </div>
                </div>

            </>
    )
}