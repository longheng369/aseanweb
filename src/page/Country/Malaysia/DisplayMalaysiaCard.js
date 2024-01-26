import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Input } from "antd";
import "../../Home/HomeProps.css";
import "../../Home/DisplayProduct.css";
import { useAuth } from "../../login/AuthContext";
import {
  addDoc,
  doc,
  collection,
  deleteDoc,
  getDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { db } from "../../../../src/Firebase/firebase";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
const { Search } = Input;

const DisplayMalaysiaCard = ({ cards, search, user }) => {
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
    <div style={{ padding: "2%" }}>
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

      <Row gutter={1}>
        {isFavorite
          .filter(({ Data }) => {
            if (search === "") {
              return Data;
            } else if (Data.name.toLowerCase().includes(search.toLowerCase())) {
              return Data;
            }
          })
          .map(({ Data, id, isFavorite }) => {
            return (
              <Col sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} key={id}>
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
      </Row>
    </div>
  );
};

export default DisplayMalaysiaCard;
