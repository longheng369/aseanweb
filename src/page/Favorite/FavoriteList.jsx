import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Home/HomeList.css";
import {
  collection,
  onSnapshot,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase";

// const storedData = localStorage.getItem("user");
// const userData = JSON.parse(storedData);
// const uid = userData.user.uid;
const uid = "EVf4EF0T7CS3qStY4xOETk4mYZB3"


const FavoriteList = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading,setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCollectionRef = collection(db, "users", uid, "favorite");
        const condition = where("cid", "==", id);
        const queryRef = query(dataCollectionRef, condition);
        const querySnapshot = await getDocs(queryRef);
        setData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIsLoading(false)
      } catch (error) {
        console.log("Error")
      }
    };
    fetchData();
  }, []);

  const goBack = () => {
    window.history.back(); // Navigate back using window.history
  };

  return (
    <div>
      {data
        .map(({ Data, id }) => {
          if (isLoading) {
            return <h1>Loading...</h1>;
          } else {
            return (
              <article className="card-container" key={id}>
                <div className="conten">
                  <img className="conten_img" src={Data.image} alt="" />
                </div>
                <div className="conten">
                  <h1 className="conten_name">{Data.name}</h1>
                  <p>{Data.describe}</p>
                  <p>{Data.description}</p>
                </div>
                <button className="backBtn" onClick={goBack}>
                  Back
                </button>
              </article>
            );
          }
        })}
    </div>
  );
};

export default FavoriteList;

