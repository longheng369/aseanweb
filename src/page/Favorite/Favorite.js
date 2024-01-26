import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../login/AuthContext";
import {
  addDoc,
  doc,
  collection,
  deleteDoc,
  getDocs,
  where,
  query,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { Input } from "antd";
import { Filter } from "@mui/icons-material";

const Favorite = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState([]);
  const { Search } = Input;
  const [cards, setCards] = useState([]);
  const uid = currentUser?.uid;
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
      // useEffect(() => {
      const dataCollectionRef = collection(db, "users", uid, "favorite");
      const subscribe = onSnapshot(dataCollectionRef, (snapshot) => {
        setUser(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIsLoading(false);
      });
      return () => subscribe();
      // }, []);
    }
  }, []);

  useEffect(() => {
    updateIsFavorite();
  }, [user, cards]);

  const updateIsFavorite = () => {
    const updatedIsFavorite = cards.map((card) => {
      // Check if there is a matching 'cid' and 'id' in 'user'
      const isFav = user.some((userItem) => userItem.cid === card.id);
      return { ...card, id: card.id, isFavorite: isFav };
    });
    setIsFavorite(updatedIsFavorite);
  };

  const toggleFavorite = async (Data, cid) => {
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
  };

  const FilterData = isFavorite.filter((fav) => fav.isFavorite == true);

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <Row gutter={1}>
        {FilterData.map(({ Data, id, isFavorite }) => {
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
                    onClick={() => toggleFavorite(Data, id, isFavorite)}
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
              <Link className="detail" to={"/brunei/"+id.toString()}>
                Detail
              </Link>
              <br />
            </Col>
          );
        })}
      </Row>
    );
  }
};

export default Favorite;
