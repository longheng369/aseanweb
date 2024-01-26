import { useEffect, useState } from "react";
import "../style/add.scss";
import { FaRegImage } from "react-icons/fa6";
import { db, storage } from "../Firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [descs, setDescs] = useState("");
  const [describe, setDescribe] = useState("");
  const [description, setDescription] = useState("");
  const [route, setRoute] = useState("");
  const [image, setImage] = useState("");
  const [percent, setPercent] = useState(0);
  const [imageToChange, setImageToChange] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    const specificDocumentRef = doc(db, "data", id);

    const getData = async () => {
      try {
        const docSnapshot = await getDoc(specificDocumentRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setName(data.Data.name);
          setDesc(data.Data.desc);
          setDescs(data.Data.descs);
          setDescribe(data.Data.describe);
          setDescription(data.Data.description);
          setRoute(data.Data.route);
          setImageToChange(data.Data.image);
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.error("Error getting document: ", error);
      } finally {
      }
    };

    getData();
  }, []);




  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImage(fileURL);
      setImageToChange(file);
    }
  };

  const resetFileInput = () => {
    // Reset the input by setting the selected file to null
    setImage(null);
    setImageToChange(null);
    // Clear the value of the input to allow selecting the same file again
    document.getElementById("image").value = null;
  };
  function printCount() {
    setPercent(percent + 1);
  }


  const update = async () => {
    const intervalId = setInterval(printCount, 100);
    const dataDocRef = doc(db, "data", id);
    const storageRef = ref(storage, `images/${imageToChange.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageToChange);

    try {
      await uploadTask;

      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      const updatedData = {
        name,
        desc,
        descs,
        describe,
        description,
        route,
        image: downloadURL,
      };

      await updateDoc(dataDocRef, { Data: updatedData });

      clearInterval(intervalId);
      setPercent(0);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during file upload or document update:", error);
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        <div className="image-container">
          {image ? (
            <img src={image} />
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
          value={route}
          onChange={(e) => setRoute(e.target.value)}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
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
            value={descs}
            onChange={(e) => setDescs(e.target.value)}
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
            value={describe}
            onChange={(e) => setDescribe(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button onClick={update}>Edit</button>

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

export default Edit;
