import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../Firebase/firebase";
import Card from "../Card";
import AddCard from "../AddCard";
const IndonesiaAdmin = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // fetch All data from Data collection
  useEffect(() => {
    const dataCollectionRef = collection(db, "data");
    const unsubscribe = onSnapshot(dataCollectionRef, (snapShot) => {
      setData(snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const All = data.filter((d) => d.Data.route === "indonesia");
  if (isLoading) {
    return (
      <div className="absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]">
        <div className="loading loading-infinity loading-lg scale-[5]"></div>
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-4 gap-8 p-4 pl-16 w-[98.5vw]">
        {All.map(({ Data, id }) => {
          return <Card {...Data} id={id} key={id} />;
        })}
        <AddCard />
      </div>
    );
  }
};

export default IndonesiaAdmin;
