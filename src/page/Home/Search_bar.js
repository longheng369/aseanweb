import { createContext, useState } from "react";
import "./Search_bar.scss";
import { IoSearchOutline } from "react-icons/io5";
const Search_bar = ({ sendDataToParent }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    sendDataToParent(value);
  };
  return (
    <div className="search-wrapper">
      <div className="search">
        <input
          placeholder="Search"
          value={inputValue}
          onChange={handleChange}
        />
        <button>
          <IoSearchOutline />
        </button>
      </div>
      <div className="event">
        <p>ASEAN Celebration |</p> &emsp;
        <p>Events |</p>&emsp;
        <p>Festivals</p>
      </div>
    </div>
  );
};

export default Search_bar;
