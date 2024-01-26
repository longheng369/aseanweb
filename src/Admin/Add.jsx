import React, { useEffect, useRef, useState } from "react";
import "../style/add.scss";
import { FaRegImage } from "react-icons/fa6";
import { db, storage } from "../Firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, count } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import InputFile from "./InputFile";
const Add = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [descs, setDescs] = useState("");
  const [describe, setDescribe] = useState("");
  const [description, setDescription] = useState("");
  const [route, setRoute] = useState("");
  const [image, setImage] = useState("");
  const [percent, setPercent] = useState(0);
  const [data, setData] = useState({
    name: "",
    desc: "",
    descs: "",
    describe: "",
    description: "",
    route: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (event) => {
    // Update the state with the selected file
    setImage(event.target.files[0]);
  };

  const resetFileInput = () => {
    // Reset the input by setting the selected file to null
    setImage(null);
    // Clear the value of the input to allow selecting the same file again
    document.getElementById("image").value = null;
  };

  
  const upload = async () => {
    function printCount() {
      setPercent((prevPercent) => prevPercent + 1);
    }

    const intervalId = setInterval(printCount, 100);

    const dataCollectionRef = collection(db, "data");
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    try {
      await uploadTask;

      // Ensure upload is complete before getting the download URL
      if (uploadTask.snapshot.state === "success") {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // Update Data in Firestore
        setData((prevData) => ({ ...prevData, image: downloadURL }));
        const Data = { ...data, image: downloadURL };

        // Add Data to Firestore
        await addDoc(dataCollectionRef, { Data });

        clearInterval(intervalId);
        setPercent(0);
        navigate("/dashboard");
      } else {
        console.error("Upload task did not complete successfully.");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        <div className="image-container">
          {image ? (
            <img src={URL.createObjectURL(image)} />
          ) : (
            <label className="image-icon" htmlFor="image">
              <FaRegImage />
            </label>
          )}
          <input
            className="file"
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
          />
        </div>
        <button
          className="p-4 bg-blue-400 rounded-lg text-white"
          type="button"
          onClick={resetFileInput}
        >
          Reset File Input
        </button>
        <input
          className="route"
          type="text"
          placeholder="Route"
          name="route"
          onChange={handleInputChange}
        />
      </div>
      <div className="right-side">
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="desc"
            placeholder="Name"
            id="name"
            name="name"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="desc">Card Describe</label>
          <input
            type="text"
            className="desc"
            placeholder="Card describe"
            id="desc"
            name="desc"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="descs">Card Description</label>
          <input
            type="text"
            className="desc"
            placeholder="Card description"
            id="descs"
            name="descs"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="describe">Describe</label>
          <input
            type="text"
            className="desc"
            placeholder="Describe"
            id="describe"
            name="describe"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button onClick={upload}>Add</button>

        {percent != 0 ? (
          <div className="bg-[rgba(0,0,0,0.6)] w-[99vw] h-[99vh] absolute top-0 right-0 ">
            <div className="loading loading-spinner loading-lg perc"></div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Add;
