

import React, { useState } from 'react';
import "./Layout.css";
import logo from "../../assent/logo/logo.jpg"
import { Col, Dropdown, Flex, Row, Space } from "antd";
import { FaFacebook } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFlag } from "react-icons/fa6";
import { GiCambodia } from "react-icons/gi";
import { BN, GP, ID, KH, LA, MM, MY, PH, PL, SG, TH, Thai, VN } from 'country-flag-icons/react/3x2'
import { IoMdLogIn } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import { FaHome } from "react-icons/fa";
import {  HeartTwoTone,HeartOutlined } from '@ant-design/icons';


import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Login from '../../page/login/Login';
import Home from '../../page/Home/Home';
import { useAuth } from '../../page/login/AuthContext';
const { Header, Sider, Content } = Layout;



const Layoutmain= () => {
  //For click on menu have route 1
  const {currentUser} = useAuth();
  const [signout,setSignOut] = useState("SIGN OUT")
  const [token,setToken] = useState(true)
  const navigate = useNavigate();

  const toggle = () => {
    alert("Sign out")
  }

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  return (
    <div>
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          //For click on menu have route 2
          //Layout Menu
          onClick={(e)=>{
            navigate(e.key)
          }}
          
          items={[
         
            {
              key: "/login",
              icon: <IoMdLogIn />,
              label: "ACCOUNT" ,
            },
            {
              key: '/',
              icon: <FaHome />,
              label: 'Home',
            },
          
            {
              key: '/cambodia',
              icon: <KH className='flag'  />,
              label: 'Cambodia',
            },
            {
              key: '/thai',
             icon:<TH className='flag' />,
              label: 'Thailand',
            },
            {
              key: '/vietnam',
             icon:<VN className='flag' />,
              label: ' Vietnam',
            },
            {
              key: '/indonesia',
             icon:<ID className='flag' />,
              label: '  Indonesia',
            },
            {
              key: '/myanmar',
             icon:<MM className='flag' />,
              label: 'Myanmar',
            },
            {
              key: '/malaysia',
             icon:<MY className='flag' />,
              label: ' Malaysia',
            },
            {
              key: '/lao',
             icon:<LA className='flag' />,
              label: ' Laos',
            },
            {
              key: '/philippines',
             icon:<PH className='flag' />,
              label: 'Philippines',
            },
            {
              key: '/Singapore',
             icon:<SG className='flag' />,
              label: ' Singapore',
            },
            {
              key: '/brunei',
             icon:<BN className='flag' />,
              label: 'Brunei',
            },
           
            {
              key: '/AboutPage',
              icon:<FcAbout />,
              label: 'ABOUT',
            },
            {
              key: "/Favorite",
              icon:<HeartTwoTone twoToneColor="white" /> ,
              label: "Favorite",
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header className='Header'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        > <div style={{display:'flex', justifyContent:'space-between'}}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
             
            }}
          />
            <div className='logo'>
              <b className='logos'>celebration of asean</b> 
              <div className='pottPotho'>
                <img src={logo} width={50} height={50}/> 
              </div>
            </div>

    </div>
        </Header>
        <Content className='Content'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: "75vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          
      
          <Outlet/>
          
        </Content>
      </Layout>
    </Layout>



   
    <div style={{marginTop:20,backgroundColor:'#001529' ,padding:"50px 10%"}}>

<Row>
    <Col span={8}>
        <img src={logo} width={50} height={50}/>
        <div className='title'><b>Celebration of ASEAN</b></div>
        <p className='title'>Celebrations vary widely across cultures and individuals, but they share the common purpose of bringing people together to mark and appreciate important moments in life. Whether grand or intimate, celebrations contribute to the rich tapestry of human experiences.</p>
    </Col>
    <Col span={8}>
          <div className="title"><h3>Get in Touch  </h3></div> <br/>
      
        <div className="con"><FaFacebook/>&emsp;facebook</div> 
        <div className="con"><FaTiktok />&emsp;TikTok</div> 
        <div className="con"><FaTwitter />&emsp;Twitter</div> 
        <div className="con"><FaInstagramSquare />&emsp;Instagram</div> 
        <div className="con"><FaYoutube />&emsp;Youtube</div> 
       

    </Col>

    <Col span={8}>
    <div className="title"><h3> Celebration of ASEAN Development </h3></div> <br/>
    <div className='devolveper'> &emsp;CHIM SOKPOLEN</div> <br/>
    <div className='devolveper'> &emsp;CHEA SEVMEY</div> <br/>
    <div className='devolveper'> &emsp;CHHOUN PISAL</div> 
    </Col>
  </Row>
</div>
    </div>
  );
};
export default Layoutmain;