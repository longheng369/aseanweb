import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";

const AddCard = () => {
  return (
    <div>
        <div className=" w-[20rem] h-[22rem] bg-gray-300 shadow-xl opacity-80">
            <Link to="/dashboard/add" className='flex justify-center items-center text-[4rem] rounded-xl bg-slate-100  w-[100px] h-[100px] relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <IoMdAdd/>
            </Link>
        </div>
    </div>
  )
}

export default AddCard