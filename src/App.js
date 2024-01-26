import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layoutmain from "./componet/layout/Layoutmain";
import AboutPage from "./page/About/AboutPage";
import Cambodia from "./page/Country/Cambodia/Cambodia";
import Thailand from "./page/Country/Thailand/Thailand";
import Login from "./page/login/Login";
import Routenotfound from "./page/Route-not-found/Routenotfound";
import CamList from "./page/Country/Cambodia/CambodiaList";
import Home from "./page/Home/Home";
import HomeList from "./page/Home/HomeList";
// import Com from "./Comment/Com";
import ThaiList from "./page/Country/Thailand/ThaiList";
import Vietnam from "./page/Country/Vietnam/Vietnam";
import VNList from "./page/Country/Vietnam/VietnamList";
import Indonesia from "./page/Country/Indonesia/Indonesia";
import INList from "./page/Country/Indonesia/IndonasiaList";
import Myanmar from "./page/Country/Myanmar/Myanmar";
import MyList from "./page/Country/Myanmar/MyanmarList";
import Malaysia from "./page/Country/Malaysia/Malaysia";
import MalaysiaList from "./page/Country/Malaysia/MalaysiaList";
import Lao from "./page/Country/Laos/Laos";
import LaoList from "./page/Country/Laos/LaosList";
import Philippines from "./page/Country/Philippines/Philipines";
import PhilippinesList from "./page/Country/Philippines/PhilipinesList";
import Singapore from "./page/Country/Singapore/Singapore";
import SingaporeList from "./page/Country/Singapore/SingaporeList";
import Brunei from "./page/Country/Brunei/Brunie";
import BruneiList from "./page/Country/Brunei/BruneiList";
// import FavoriteList from "./page/Home/FavoriteList";
import Favorite from "./page/Favorite/Favorite";

import Add from "./Admin/Add";
import FavoriteList from "./page/Favorite/FavoriteList";
import Password from "./Admin/Password";
import Singup from "./page/login/Singup";
import Dashboard from "./Admin/Dashboard";
import AdminLayout from "./Admin/AdminLayout";
import ViewCard from "./Admin/ViewCard";
import Edit from "./Admin/Edit";
import BrunieAdmin from "./Admin/bruneiAdmin/BrunieAdmin";
import CambodiaAdmin from "./Admin/cambodiaAdmin/CambodiaAdmin";
import IndonesiaAdmin from "./Admin/indonesiaAdmin/IndonesiaAdmin";
import LaosAdmin from "./Admin/laosAdmin/LaosAdmin";
import MalaysiaAdmin from "./Admin/malaysiaAdmin/MalaysiaAdmin";
import MyanmarAdmin from './Admin/myanmarAdmin/MyanmarAdmin';
import PhilipinesAdmin from './Admin/philipinesAdmin/PhilipinesAdmin';
import SingaporeAdmin from './Admin/singaporeAdmin/SingaporeAdmin';
import ThailandAdmin from "./Admin/thailandAdmin/ThailandAdmin";
import VietnamAdmin from "./Admin/vietnamAdmin/VietnamAdmin";
function App() {
  const current = localStorage.getItem("user");
  const user = JSON.parse(current);
  const [admin, setAdmin] = useState(user);

  const RequireAuth = ({ children }) => {
    return admin ? children : <Navigate to="/password" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Website */}
        <Route path="/" element={<Layoutmain />}>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<HomeList />} />
          <Route path="/cambodia" element={<Cambodia />} />
         
          <Route path="/cambodia/:id" element={<CamList />} />
          <Route path="/thai" element={<Thailand />} />
          <Route path="/thai/:id" element={<ThaiList />} />
          <Route path="/vietnam" element={<Vietnam />} />
          <Route path="/vietnam/:id" element={<VNList />} />
          <Route path="/indonesia" element={<Indonesia />} />
          <Route path="/indonesia/:id" element={<INList />} />
          <Route path="/myanmar" element={<Myanmar />} />
          <Route path="/myanmar/:id" element={<MyList />} />
          <Route path="/malaysia" element={<Malaysia />} />
          <Route path="/malaysia/:id" element={<MalaysiaList />} />
          <Route path="/lao" element={<Lao />} />
          <Route path="/lao/:id" element={<LaoList />} />
          <Route path="/philippines" element={<Philippines />} />
          <Route path="/philippines/:id" element={<PhilippinesList />} />
          <Route path="/Singapore" element={<Singapore />} />
          <Route path="/Singapore/:id" element={<SingaporeList />} />
          <Route path="/brunei" element={<Brunei />} />
          <Route path="/brunei/:id" element={<BruneiList />} />
          <Route path="/Favorite" element={<Favorite />} />
          <Route path="Favorite/:id" element={<FavoriteList />} />
          <Route path="/AboutPage" element={<AboutPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Singup />} />
          {/* <Route path="/com" element={<Com />} /> */}
          <Route path="*" element={<Routenotfound />} />
        </Route>
        <Route path="/password" element={<Password />} />
        <Route path="/dashboard" element={<RequireAuth><AdminLayout/></RequireAuth>}>
          <Route index element={<RequireAuth><Dashboard/></RequireAuth>} />
          <Route path="view/:id" element={<RequireAuth><ViewCard/></RequireAuth>} />
          <Route path="edit/:id" element={<RequireAuth><Edit/></RequireAuth>}/>
          <Route path="add" element={<RequireAuth><Add /></RequireAuth>} />
          <Route path="brunie" element={<RequireAuth><BrunieAdmin/></RequireAuth>} />
          <Route path="cambodia" element={<RequireAuth><CambodiaAdmin/> </RequireAuth>} />
          <Route path="indonesia" element={<RequireAuth><IndonesiaAdmin /></RequireAuth>} />
          <Route path="malaysia" element={<RequireAuth><MalaysiaAdmin /></RequireAuth>} />
          <Route path="myanmar" element={<RequireAuth><MyanmarAdmin /></RequireAuth>} />
          <Route path="laos" element={<RequireAuth><LaosAdmin /></RequireAuth>} />
          <Route path="singapore" element={<RequireAuth><SingaporeAdmin /></RequireAuth>} />
          <Route path="thailand" element={<RequireAuth><ThailandAdmin /></RequireAuth>} />
          <Route path="vietnam" element={<RequireAuth><VietnamAdmin /></RequireAuth>} />
          <Route path="philipines" element={<RequireAuth><PhilipinesAdmin /></RequireAuth>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
