// import React, { useEffect, useState } from "react";
// import DisplayHomeCard from "./DisplayHomeCard";
// import { collection, onSnapshot } from "firebase/firestore";
// import { db } from "../../Firebase/firebase";
// import "./HomeProps.css";
// import { Input } from "antd";
// import CarouselHome from "../../componet/Carousel/CarouselHome";
// import Search_bar from "./Search_bar";
// import { useAsyncError } from "react-router-dom";
// function Home() {
//   // const [data, setData] = useState([]);
//   // const [user, setUser] = useState([]);
//   // useEffect(() => {
//   //   const GlobalCollectionRef = collection(db, "data");
//   //   const unsubscribe = onSnapshot(GlobalCollectionRef, (snapshot) => {
//   //     setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//   //   });
//   //   return () => unsubscribe();
//   // }, []);
//   // const Data = data.filter(
//   //   (e) => e.Data.route === "indonesia" || e.Data.route === "cambodia"
//   // );

//   // const [search, setSearch] = useState("");
//   // const handleChildData = (childData) => {
//   //   setSearch(childData);
//   // };

//   return (
//     <div>
//       <div>
//         <Search_bar />
//         <div className="event">
//           <p className="text-lg p-2">ASEAN Celebration |</p> &emsp;
//           <p className="text-lg p-2">Events |</p>&emsp;
//           <p className="text-lg p-2">Festivals</p>
//         </div>
//         <br />
//         <CarouselHome />
//       </div>

//       {/* <div className="grid grid-cols-[3fr,1fr] mt-6">
//         <section className="grid grid-cols-3 gap-8 ">
//           {Data.filter(({ Data }) => {
//             if (search === "") {
//               return Data;
//             } else if (Data.name.toLowerCase().includes(search.toLowerCase())) {
//               return Data;
//             }
//           }).map((data) => {
//             return <DisplayHomeCard data={data} key={data.id} />;
//           })}
//         </section>
//         <section className="flex flex-col gap-4">
//           <iframe
//             width="100%"
//             height="215"
//             src="https://www.youtube.com/embed/HdSlI6fqMMw?si=DXKZStuEVqEBRwEl"
//             allowFullScreen
//             title="Video Player"
//           ></iframe>
//           <div className="flex flex-col justify-center">
//             <div className="add1">Advertisement</div>
//             <img src="https://tpc.googlesyndication.com/simgad/7373588473816201172?sqp=4sqPyQQ7QjkqNxABHQAAtEIgASgBMAk4A0DwkwlYAWBfcAKAAQGIAQGdAQAAgD-oAQGwAYCt4gS4AV_FAS2ynT4&rs=AOga4qkIeavxLOUePm8Kgy1aAwcMu2CibQ" />
//           </div>
//         </section>
//       </div> */}
//     </div>
//   );
// }

// export default Home;

import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { useAuth } from "../login/AuthContext";
import CarouselHome from "../../componet/Carousel/CarouselHome";
import Search_bar from "./Search_bar";
import DisplayHomeCard from "./DisplayHomeCard";

function Home() {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;

  const [cards, setCards] = useState([]);
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { Search } = Input;

  const handleChildData = (childData) => {
    setSearch(childData);
  };

  useEffect(() => {
    const dataCollectionRef = collection(db, "data");
    const unsubscribe = onSnapshot(dataCollectionRef, (snapShot) => {
      setCards(snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const usersCollectionRef = collection(db, "users", uid, "favorite");
      const subscribe = onSnapshot(usersCollectionRef, (snapshot) => {
        setUser(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      return () => subscribe();
    }
  }, []);

  if (isLoading) {
    return (
      <div>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else {
    const dataFilter = cards.filter(
      (card) =>
        card.Data.route === "indonesia" || card.Data.route === "cambodia"
    );
    return (
      <div>
     
          <Search_bar sendDataToParent={handleChildData} />
        
          <CarouselHome />
       
        <DisplayHomeCard cards={dataFilter} search={search} user={user} />
      </div>
    );
  }
}

export default Home;
