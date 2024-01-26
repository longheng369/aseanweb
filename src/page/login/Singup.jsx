import { useState } from "react";
import "../../style/signup.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import signup from "../../assent/up.webp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [typeBoolean, setTypeBoolean] = useState(true);
  const navigate = useNavigate();
  const [err, setErr] = useState(false);

  const handleClick = () => { 
    setTypeBoolean(!typeBoolean);
    if (typeBoolean == true) {
      setType("text");
    } else {
      setType("password");
    }
  };

  // longheng@gmail.com
  // 123456
  const handleSignUp = async (e) => {
    e.preventDefault()
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // create user in new collection 
        navigate("/login")
      })
      .catch((error) => {
        setErr(true)
      });
  };

  return (
    <div>
      <div className="signup-whole">
        <div>
          <img className="w-[450px]" src={signup} />
        </div>
        <div className="signup-container">
          <AccountCircleIcon className="AccountCircleIcon-s" />

          <h1>Sign Up</h1>
          <div className="input-field-signup">
            <EmailIcon />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-field-signup">
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
          <button className="btn-s" onClick={handleSignUp} >Sing Up</button>
          <div className="footerlogin">
            Have an account?
            <Link className="signup" to="/login">
              Sign In
            </Link>
          </div>
          {err && <h3>alread token!</h3>}
        </div>
      </div>
    </div>
  );
};

export default Signup;
