// import { Link } from "react-router-dom";
// import "./HomeProps.css";
// import "./DisplayProduct.css";
// import { FaHeart } from "react-icons/fa";
// import CarouselHome from "../../componet/Carousel/CarouselHome";

// const DisplayHomeCard = () => {
//   return (
//     <article className="card card-compact w-[18rem] max-h-[22rem] bg-base-100 shadow-xl p-3 hover:scale-105 transition-all duration-300 relative">
//       <img className=" bg-green-100 h-[180px]" src="" alt="image" />
//       <p className="text-lg font-bold p-1">Khmer Happy New Year</p>
//       <p className="text-lg pl-2">Celebration</p>
//       <p className="text-md pl-2">The Three of first New Year</p>
//       <button className="relative left-[90%] translate-x-[-50%] w-11 text-center bg-slate-200 p-3 rounded-lg text-lg hover:scale-110 duration-150">
//         <FaHeart />
//       </button>
//     </article>
//   );
// };

// export default DisplayHomeCard;

import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Input } from "antd";
import "../Home/HomeProps.css";
// import "../../Home/DisplayProduct.css";
import "../Home/DisplayProduct.css";

import { useAuth } from "../login/AuthContext";
import {
  addDoc,
  doc,
  collection,
  deleteDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";

import { db } from "../../Firebase/firebase";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
const { Search } = Input;

const DisplayHomeCard = ({ cards, search, user }) => {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState([]);

  useEffect(() => {
    updateIsFavorite();
  }, [cards, user]);

  const updateIsFavorite = () => {
    const updatedIsFavorite = cards.map((card) => {
      // Check if there is a matching 'cid' and 'id' in 'user'
      const isFav = user.some((userItem) => userItem.cid === card.id);
      return { ...card, id: card.id, isFavorite: isFav };
    });
    // Update the state
    setIsFavorite(updatedIsFavorite);
  };

  const toggleFavorite = async (cid, Data, isFav) => {
    if (currentUser) {
      const dataCollectionRef = collection(db, "users", uid, "favorite");
      const condition = where("cid", "==", cid);
      const queryRef = query(dataCollectionRef, condition);
      const querySnapshot = await getDocs(queryRef);
      if (querySnapshot.size > 0) {
        const deleteId = querySnapshot.docs[0].id;
        const documentRef = doc(dataCollectionRef, deleteId);
        await deleteDoc(documentRef);
      } else {
        await addDoc(dataCollectionRef, { Data, cid });
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="popular">
        <div className="pop">
          <div className="popular1">
            <h2>ASEAN </h2>
          </div>
          <div className="popular2">
            <h2>Brunei ASEAN Celebration </h2>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="grid grid-cols-[3fr,1fr]">
        <div className="mr-4 grid grid-cols-3">
          {isFavorite
            .filter(({ Data }) => {
              if (search === "") {
                return Data;
              } else if (
                Data.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return Data;
              }
            })
            .map(({ Data, id, isFavorite }) => {
              return (
                <Col
                  sm={{ span: 24 }}
                  md={{ span: 8 }}
                  lg={{ span: 6 }}
                  key={id}
                >
                  <div className="product">
                    <img src={Data.image} className="Home_img" />
                    <div className="name">
                      <b>{Data.name}</b>
                    </div>
                    <div className="heart">
                      <div>
                        <div className="desc">{Data.desc}</div>
                        <div className="descs">{Data.descs}</div>
                      </div>

                      <button
                        className="heartBtn"
                        onClick={() => toggleFavorite(id, Data, isFavorite)}
                      >
                        {isFavorite ? (
                          <FaHeart color="red" />
                        ) : (
                          <FaHeart color="gray" />
                        )}
                      </button>
                    </div>
                  </div>
                  <br />
                  <Link className="detail" to={id.toString()}>
                    Detail
                  </Link>
                  <br />
                </Col>
              );
            })}
        </div>
        <section className="flex flex-col gap-4">
          <iframe
            width="100%"
            height="215"
            src="https://www.youtube.com/embed/HdSlI6fqMMw?si=DXKZStuEVqEBRwEl"
            allowFullScreen
            title="Video Player"
          ></iframe>
          <div className="flex flex-col justify-center">
            <div className="add1">Advertisement</div>
            <img src="https://tpc.googlesyndication.com/simgad/7373588473816201172?sqp=4sqPyQQ7QjkqNxABHQAAtEIgASgBMAk4A0DwkwlYAWBfcAKAAQGIAQGdAQAAgD-oAQGwAYCt4gS4AV_FAS2ynT4&rs=AOga4qkIeavxLOUePm8Kgy1aAwcMu2CibQ" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DisplayHomeCard;
