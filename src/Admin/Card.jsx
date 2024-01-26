import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import { db } from "../Firebase/firebase";
const Card = ({name,desc,image,id}) => {
 
  const handleDelete = async (id) => {
    try {
      const deleteDocRef = doc(db,"data",id)
      await deleteDoc(deleteDocRef)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="card card-compact w-[20rem] bg-base-100 shadow-xl p-3 hover:scale-105 transition-all duration-300">
        <div className="rounded-lg overflow-hidden h-[200px] flex justify-center items-center">
          <img  src={image} alt="Shoes" />
        </div>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{desc}</p>
          <div className="card-action flex gap-4">
            <Link to={"/dashboard/view/"+id} className="p-2 bg-purple-500 rounded-md text-white hover:scale-110 transition-all duration-300 text-lg">View</Link>
            <Link to={"/dashboard/edit/"+id} className="p-2 bg-blue-500 rounded-md text-white hover:scale-110 transition-all duration-300 text-lg">Edit</Link>
            <button onClick={()=> handleDelete(id)} className="p-2 bg-red-500 rounded-md text-white hover:scale-110 transition-all duration-300 text-lg">Delete</button>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Card;
