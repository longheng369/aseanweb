import { useState } from "react";
import "../../style/login.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../Firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import illustration from "../../assent/illustration.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const Login = () => {
  const { currentUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [typeBoolean, setTypeBoolean] = useState(true);
  const navigate = useNavigate();
  const [err, setErr] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (currentUser) {
      auth.signOut().then(() => {
       
        localStorage.setItem("user", null);
      });
    } else {
      try {
        const credential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        localStorage.setItem("user", JSON.stringify(credential));
        navigate("/");
      } catch (error) {
        setErr(true);
      }
    }
  };

  const handleClick = () => {
    setTypeBoolean(!typeBoolean);
    if (typeBoolean == true) {
      setType("text");
    } else {
      setType("password");
    }
  };

  return (
    <div>
      {!currentUser ? (
        <div className="whole">
          <div>
            <img src={illustration} />
          </div>
          <div className="login">
            <AccountCircleIcon className="AccountCircleIcon" />

            <h1>LOGIN</h1>
            <div className="input-field">
              <EmailIcon />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <HttpsIcon />
              <input
                type={type}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleClick}>
                {typeBoolean ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>
            <button className="btn" onClick={handleLogin}>
              Login
            </button>
            <div className="footerlogin">
              create account?
              <Link className="signup" to="/signup">
                Sign Up
              </Link>
            </div>
            {err && <h3>Wrong email or password!</h3>}
          </div>
        </div>
      ) : (
        <button
          className="bg-blue-500 p-4 rounded-md text-white font-bold text-lg hover:bg-blue-700 transition duration-150 ease-out hover:ease-in hover:scale-110"
          onClick={handleLogin}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Login;
