import React, { useEffect, useState } from "react";
import DisplayBrunei from "./DisplayLaosCard";
import { Input } from "antd";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../Firebase/firebase";
import { useAuth } from "../../login/AuthContext";

function Laos() {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;

  const [cards, setCards] = useState([]);
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { Search } = Input;

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
      const usersCollectionRef = collection(db, "users", uid, "favorite");
      const subscribe = onSnapshot(usersCollectionRef, (snapshot) => {
        setUser(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      // }, []);
      return () => subscribe();
    }
  }, []);

  if (isLoading) {
    return (
      <div><span className="loading loading-spinner loading-lg"></span></div>
    );
  } else {
    const dataFilter = cards.filter((card) => card.Data.route === "laos");
    return (
      <div>
        <div className="templateContainer">
          <div className="searchInput_Container">
            <Search
              className="search"
              id="searchInput"
              type="text"
              placeholder="input search text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              enterButton
            />
            <div className="event">
              <p>ASEAN Celebration |</p> &emsp;
              <p>Events |</p>&emsp;
              <p>Festivals</p>
            </div>
          </div>
        </div>
        <DisplayBrunei cards={dataFilter} search={search} user={user} />
      </div>
    );
  }
}

export default Laos;
